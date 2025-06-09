from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict
from .. import wikipedia

router = APIRouter(prefix="/wiki", tags=["Wiki"])


@router.get("/search", response_model=Dict[str, List[Dict[str, str]]])
def api_search_wikipedia(term: str = Query(..., min_length=1)):
    """
    Endpoint: /wiki/search?term=<texto>
    Retorna: { "results": [ { "pageid": 123, "title": "…" }, … ] }
    """
    try:
        resultados = wikipedia.search_wikipedia(term)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error al buscar en Wikipedia: {e}")

    return {"results": resultados}


@router.get("/detail", response_model=Dict[str, object])
def api_get_wikipedia_detail(pageid: int = Query(..., gt=0)):
    """
    Endpoint: /wiki/detail?pageid=<número>
    - Obtiene el extract (resumen) vía pageid y luego lo analiza.
    Retorna:
    {
      "pageid": 123,
      "title": "Título de la página",
      "summary": "texto...",
      "analysis": { "word_count": 100, "top_words": [ ["palabra", 5 ], … ] },
      "url": "https://en.wikipedia.org/wiki/…"
    }
    """
    try:
        extract, _ = wikipedia.fetch_article_content(pageid)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error al obtener contenido del artículo: {e}")

    if not extract:
        raise HTTPException(status_code=404, detail="No se encontró contenido para ese pageid.")

    # Analizar el texto
    count, top = wikipedia.analyze_text(extract)

    # Para armar la URL canónica necesitamos el título; 
    # fetch_article_content no retorna title, así que hacemos una búsqueda extra aquí:
    # Nota: en lugar de buscar por pageid de nuevo, podemos obtener el título del primer paso.
    # Para simplificar, haremos un pequeño workaround:
    # 1) Llamar a search_wikipedia con un término que sabemos famoso (no es ideal, 
    #    pero como el sitemap de pageid a title no está en fetch_article_content).
    # 2) Mejor usar la siguiente llamada a query(prop=info) para recuperar el title exacto.

    # Alternativa sencilla: utilizar el mismo extracto para intentar adivinar el título (no 100% fiable).
    # Lo más recomendado es usar prop=info en la misma llamada. Vamos a reimplementar con prop=info:

    from requests import get as rget
    from ..wikipedia import WIKI_API_BASE

    params_info = {
        "action": "query",
        "format": "json",
        "pageids": pageid,
        "prop": "info",
        "inprop": "url"
    }
    resp_info = rget(WIKI_API_BASE, params=params_info, timeout=10)
    resp_info.raise_for_status()
    data_info = resp_info.json().get("query", {}).get("pages", {})
    page_data = next(iter(data_info.values()))
    title = page_data.get("title", "")
    full_url = page_data.get("fullurl", f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}")

    return {
        "pageid": pageid,
        "title": title,
        "summary": extract,
        "analysis": {"word_count": count, "top_words": top},
        "url": full_url
    }
