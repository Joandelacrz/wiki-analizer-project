# backend/app/dependencies.py

from typing import Generator
from .database import SessionLocal

def get_db() -> Generator:
    """
    Dependency para inyectar la sesión de DB en cada request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
