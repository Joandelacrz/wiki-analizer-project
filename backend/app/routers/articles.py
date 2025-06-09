# backend/app/routers/articles.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/articles", tags=["articles"])

# Crear artículo
@router.post("/", response_model=schemas.Article)
def save_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    try:
        db_article = crud.create_saved_article(db=db, article=article)
        return db_article
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar el artículo: {str(e)}")

# Listar artículos guardados
@router.get("/", response_model=list[schemas.Article])
def list_articles(db: Session = Depends(get_db)):
    return crud.get_saved_articles(db)

# Eliminar artículo
@router.delete("/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    success = crud.delete_saved_article(db, article_id)
    if not success:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return {"message": "Artículo eliminado"}
