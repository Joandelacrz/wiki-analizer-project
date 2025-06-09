📚 Wiki-Analyzer

**Wiki-Analyzer** es una aplicación **full-stack** que permite buscar artículos en Wikipedia, visualizar su resumen y análisis de texto, y guardarlos como favoritos. Está construida con **React + Vite** en el frontend y **FastAPI + PostgreSQL** en el backend.

---

## 🚀 Funcionalidades

- 🔍 Búsqueda de artículos de Wikipedia
- 📄 Visualización de resumen y análisis de texto (frecuencia de palabras)
- 💾 Guardado de artículos favoritos
- 📋 Listado de artículos guardados desde la base de datos
- 🗑️ Eliminación de artículos guardados

---

## 🧱 Tecnologías utilizadas

| Área       | Herramientas                                     |
|------------|--------------------------------------------------|
| Frontend   | React, TypeScript, Vite                          |
| Backend    | FastAPI, SQLAlchemy, Pydantic                    |
| Base de datos | PostgreSQL                                   |
| Otros      | Wikipedia API, dotenv, CORS                      |

---

## ⚙️ Instalación y ejecución

### ✅ Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Python](https://www.python.org/) (v3.10+)
- [PostgreSQL](https://www.postgresql.org/) corriendo en `localhost:5432`

---

### 🔧 1. Backend (FastAPI)

#### a. Configurar entorno

Crea un archivo `.env` en `backend/app/` con el contenido:

DATABASE_URL=postgresql://postgres:1234@localhost:5432/wikipedia_db

bash
Copy
Edit

> Asegúrate de que la base de datos `wikipedia_db` exista previamente.

#### b. Crear entorno virtual e instalar dependencias

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
c. Ejecutar servidor FastAPI
```

uvicorn app.main:app --reload
🔧 2. Frontend (React + Vite)



a. Configurar entorno
Crea un archivo .env en frontend/ con el contenido:
VITE_API_URL=http://localhost:8000
b. Instalar dependencias y levantar la app
cd frontend
npm install
npm run dev

La aplicación estará disponible en http://localhost:5173 por defecto.

------------------------------
🌐 API REST - Endpoints

- 🔍 Buscar artículos de Wikipedia
GET /wiki/search?term=example
Devuelve una lista de resultados con títulos y pageid.

- 📄 Detalles y análisis de un artículo
GET /wiki/detail?pageid=12345
Devuelve resumen, análisis (conteo y palabras más frecuentes) y URL de Wikipedia.

- 💾 Guardar artículo favorito
POST /articles/
Content-Type: application/json

example of return:
{
  "title": "Example Article",
  "url": "https://en.wikipedia.org/wiki/Example",
  "processed_summary": "Texto analizado..."
}

- 📋 Obtener artículos guardados
GET /articles/

- 🗑️ Eliminar un artículo por ID
DELETE /articles/{id}

- 🗄️ Base de datos
Está conectada exitosamente a PostgreSQL. La tabla principal es saved_articles con el siguiente esquema:
id: entero, clave primaria
title: texto del artículo
url: URL del artículo en Wikipedia
processed_summary: resumen analizado
date_saved: fecha en la que se guardó

⚠️ Limitaciones actuales
Aunque la conexión a la base de datos y el esquema funcionan correctamente, actualmente hay problemas al guardar, listar y eliminar artículos desde el backend (FastAPI). Sin embargo, la aplicación web funciona correctamente a nivel visual y funcional (simulación en frontend).

📌 Consideraciones de diseño
Las decisiones de diseño han sido orientadas a mantener un frontend simple, limpio y funcional con una API REST clara.
El análisis de texto se basa en frecuencia de palabras, excluyendo signos de puntuación.

🛠️ Por mejorar
- Corregir persistencia real de artículos en la base de datos.
- Añadir paginación y búsqueda en artículos guardados
- Mejorar manejo de errores en el frontend.
- Agregar tests (unitarios y de integración).
