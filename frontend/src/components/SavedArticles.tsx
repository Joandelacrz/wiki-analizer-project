import React from "react";
import { deleteSavedArticle, getSavedArticles } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { SavedArticle } from "../types";
import { notify } from "../services/notification";

const SavedArticles: React.FC = () => {
  const { data: articles, loading, error } = useFetch<SavedArticle[]>(getSavedArticles);

  const handleDelete = async (id: number) => {
    try {
      await deleteSavedArticle(id);
      notify.success("Artículo eliminado");
      // podrías forzar recarga si useFetch soporta refrescar
    } catch (err: any) {
      console.error("deleteSavedArticle error:", err.response ?? err);
      notify.error("No se pudo eliminar el artículo.");
    }
  };

  if (loading) return <p className="text-center py-4">Cargando artículos...</p>;
  if (error) return <p className="text-center text-danger py-4">{error}</p>;
  if (!articles || articles.length === 0) return <p className="text-center py-4">No hay artículos guardados.</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Artículos Guardados</h2>
      <ul className="list-group">
        {articles.map(({ id, title, url }) => (
          <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
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
