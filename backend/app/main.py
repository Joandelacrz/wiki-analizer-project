# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .database import engine, Base
from .routers import wiki, articles

# Cargar variables de entorno
load_dotenv()

app = FastAPI(
    title="Wiki-Analyzer API",
    version="1.0.0",                                        
    description="API para buscar y analizar artículos de Wikipedia, y guardar artículos favoritos."
)

# Crear tablas en la base de datos (sólo para desarrollo/migraciones básicas)
Base.metadata.create_all(bind=engine)

# Configurar CORS para permitir que el frontend (React) en localhost:3000 pueda consumir
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(wiki.router)       # /wiki/search y /wiki/detail
app.include_router(articles.router)   # /articles/

# Ruta raíz opcional
@app.get("/", tags=["root"])
def read_root():
    return {"message": "¡La API de Wiki-Analyzer está corriendo!"}
