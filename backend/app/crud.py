# backend/app/crud.py

from sqlalchemy.orm import Session
from typing import List, Optional
from . import models, schemas

def get_saved_articles(db: Session) -> List[models.SavedArticle]:
    """
    Devuelve todos los artículos guardados.
    """
    return db.query(models.SavedArticle).order_by(models.SavedArticle.date_saved.desc()).all()

def get_saved_article(db: Session, article_id: int) -> Optional[models.SavedArticle]:
    """
    Devuelve un artículo por su ID.
    """
    return db.query(models.SavedArticle).filter(models.SavedArticle.id == article_id).first()

def create_saved_article(db: Session, article: schemas.ArticleCreate) -> models.SavedArticle:
    """
    Crea y guarda un nuevo artículo en la base de datos.
    """
    db_article = models.SavedArticle(
        title=article.title,
        url=str(article.url),
        processed_summary=article.processed_summary
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def delete_saved_article(db: Session, article_id: int) -> bool:
    """
    Elimina un artículo guardado. Retorna True si existía y fue eliminado, False si no existía.
    """
    db_article = db.query(models.SavedArticle).filter(models.SavedArticle.id == article_id).first()
    if not db_article:
        return False
    db.delete(db_article)
    db.commit()
    return True
