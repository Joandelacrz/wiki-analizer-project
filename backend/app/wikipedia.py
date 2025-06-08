# backend/app/wikipedia.py

import requests
from typing import Tuple, List
import re

# Un set de stopwords muy básico. Puedes expandirlo según necesites.
STOPWORDS = {
    "the", "and", "is", "in", "to", "of", "a", "for", "on", "with", "as", "by", "an",
    "be", "this", "that", "from", "or", "at", "it", "which", "are", "was", "were",
    "has", "have", "had", "but", "not", "its", "into", "can", "will", "their", "also",
}

WIKI_API_BASE = "https://en.wikipedia.org/w/api.php"


def search_wikipedia(term: str) -> List[dict]:
    """
    Realiza búsqueda en Wikipedia, retornando lista de diccionarios
    con 'pageid' y 'title' para cada resultado.
    """
    params = {
        "action": "query",
        "list": "search",
        "srsearch": term,
        "format": "json",
        "srlimit": 10
    }
    resp = requests.get(WIKI_API_BASE, params=params, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    results = data.get("query", {}).get("search", [])
    return [{"pageid": item["pageid"], "title": item["title"]} for item in results]


def fetch_article_content(pageid: int) -> Tuple[str, str]:
    """
    Obtiene el resumen (extract) y el texto completo de un artículo dado su pageid.
    Retorna (extract, full_text).
    """
    # Para simplificar, pedimos únicamente el extract (texto plano):
    params = {
        "action": "query",
        "prop": "extracts",
        "explaintext": True,
        "pageids": pageid,
        "format": "json",
        "exintro": False,
    }
    resp = requests.get(WIKI_API_BASE, params=params, timeout=10)
    resp.raise_for_status()
    data = resp.json().get("query", {}).get("pages", {})
    page = next(iter(data.values()))
    extract = page.get("extract", "")
    # Devolver el mismo extract como “full_text” para simplificar.
    return extract, extract


def analyze_text(text: str) -> Tuple[int, List[Tuple[str, int]]]:
    """
    Dado un texto, devuelve una tupla (word_count, top_words_list).
    - word_count: total de palabras (tras hacer split sencillo).
    - top_words_list: lista de (palabra, frecuencia), ordenada por frecuencia descendente,
      excluyendo STOPWORDS. Devolvemos solo las top 10 palabras.
    """
    words = re.findall(r"\b[a-zA-Z0-9]{2,}\b", text.lower())
    filtered = [w for w in words if w not in STOPWORDS]
    freq: dict[str, int] = {}
    for w in filtered:
        freq[w] = freq.get(w, 0) + 1
    # Ordenar por frecuencia
    sorted_items = sorted(freq.items(), key=lambda item: item[1], reverse=True)
    top_n = sorted_items[:10]
    return len(words), top_n
