import React, { useEffect, useState } from "react";
import { SavedArticle } from "../types";
import { getSavedArticles, deleteSavedArticle } from "../services/api";

const SavedArticles: React.FC = () => {
  const [articles, setArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getSavedArticles()
      .then(data => {
        if (!Array.isArray(data)) throw new Error();
        setArticles(data);
      })
      .catch(() => setError("Error al cargar artículos guardados."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSavedArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch {
      alert("No se pudo eliminar el artículo.");
    }
  };

  if (loading) return <p className="text-center py-4">Cargando artículos...</p>;
  if (error) return <p className="text-center text-danger py-4">{error}</p>;
  if (articles.length === 0)
    return <p className="text-center py-4">No hay artículos guardados.</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Artículos Guardados</h2>
      <ul className="list-group">
        {articles.map(({ id, title, url }) => (
          <li
            key={id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-outline-danger btn-sm"
              aria-label={`Eliminar artículo ${title}`}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedArticles;
