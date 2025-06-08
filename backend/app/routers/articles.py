from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import SavedArticle as Article
from ..schemas import ArticleCreate, Article

router = APIRouter(prefix="/articles", tags=["articles"])

# Crear artículo
@router.post("/", response_model=Article                                                                                        )
def save_article(article: ArticleCreate, db: Session = Depends(get_db)):
    db_article = Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

# Listar artículos guardados
@router.get("/", response_model=list[Article])
def list_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()

# Eliminar artículo
@router.delete("/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    db.delete(article)
    db.commit()
    return {"message": "Artículo eliminado"}
