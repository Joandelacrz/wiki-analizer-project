📚 Wiki-Analyzer

Wiki-Analyzer es una aplicación full-stack que permite buscar artículos en Wikipedia, visualizar su resumen y análisis de texto, y guardarlos como favoritos. Está construida con **React + Vite** en el frontend y **FastAPI + PostgreSQL** en el backend
## 🚀 Funcionalidades==
- 🔍 Búsqueda de artículos de Wikipedia
- 📄 Visualización de resumen y análisis de texto (frecuencia de palabras)
- 💾 Guardado de artículos favoritos
- 📋 Listado de artículos guardados desde la base de datos
- 🗑️ Eliminación de artículos guardados

---

## 🧱 Tecnologías utilizadas

| Área      | Herramientas                            |
|-----------|------------------------------------------|
| Frontend  | React, TypeScript         |
| Backend   | FastAPI, SQLAlchemy, Pydantic            |
| Base de datos | PostgreSQL                          |
| Otros     | Wikipedia API, dotenv, CORS              |

## ⚙️ Instalación y ejecución

### ✅ Requisitos previos

- Node.js (18 o superior)
- Python (3.10+)
- PostgreSQL (corriendo en `localhost:5432`)

---

### 🔧 1. Backend (FastAPI)

#### a. Configurar entorno

Crea un archivo `.env` dentro de `backend/app/.env` con el contenido:
#### b. Crear entorno y dependencias

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt

```

🌐 API REST - Endpoints
GET /wiki/search?term=<texto>
Busca artículos de Wikipedia por término.

GET /wiki/detail?pageid=<id>
Devuelve el resumen, análisis y URL de un artículo.

POST /articles/
Guarda un artículo favorito.
Body JSON:

json
Copy
Edit
{
  "title": "Example Article",
  "url": "https://en.wikipedia.org/wiki/Example",
  "processed_summary": "Texto analizado..."
}
GET /articles/
Lista todos los artículos guardados.

DELETE /articles/{id}
Elimina un artículo por ID.

