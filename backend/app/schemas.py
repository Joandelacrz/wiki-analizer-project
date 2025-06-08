# backend/app/schemas.py

from datetime import datetime
from pydantic import BaseModel, HttpUrl

class ArticleBase(BaseModel):
    title: str
    url: HttpUrl
    processed_summary: str

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    date_saved: datetime

    class Config:
        orm_mode = True
