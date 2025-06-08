# backend/app/models.py

from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .database import Base

class SavedArticle(Base):
    __tablename__ = "saved_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(256), nullable=False)
    url = Column(String(512), nullable=False)
    processed_summary = Column(Text, nullable=False)
    date_saved = Column(DateTime(timezone=True), server_default=func.now())
