import React, { useEffect, useState } from "react";
import { SavedArticle } from "../types";
import { getSavedArticles, deleteSavedArticle } from "../services/api";
import styles from "../styles/SavedArticles.module.css";

const SavedArticles: React.FC = () => {
  const [articles, setArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchSaved = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSavedArticles();

      // Validación de formato
      if (!Array.isArray(data)) {
        throw new Error("Formato inválido de la respuesta del servidor.");
      }

      setArticles(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar artículos guardados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSavedArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("No se pudo eliminar el artículo.");
    }
  };

  if (loading) {
    return <p className={styles.loading}>Cargando artículos guardados...</p>;
  }
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
  if (articles.length === 0) {
    return <p className={styles.noSaved}>No hay artículos guardados.</p>;
  }

  return (
    <div className={styles.container}>
      <h3>Mis Artículos Guardados</h3>
      <button onClick={fetchSaved} className={styles.reloadButton}>
        Recargar
      </button>
      <ul className={styles.list}>
        {articles.map((art) => (
          <li key={art.id} className={styles.item}>
            <div>
              <a href={art.url} target="_blank" rel="noopener noreferrer">
                {art.title}
              </a>
              <p className={styles.date}>
                Guardado: {new Date(art.date_saved).toLocaleString()}
              </p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(art.id)}
              aria-label={`Eliminar el artículo ${art.title}`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedArticles;
