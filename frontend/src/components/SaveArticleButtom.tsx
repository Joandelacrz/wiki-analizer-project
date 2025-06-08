import React from "react";
import { saveArticle } from "../services/api";
import { Article } from "../services/api";

interface Props {
  article: {
    title: string;
    url: string;
    summary: string;
  };
}

const SaveArticleButton: React.FC<Props> = ({ article }) => {
  const handleSave = async () => {
    try {
      await saveArticle(
        article.title,
        article.url,
        article.summary
      );
      alert("Artículo guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el artículo");
    }
  };

  return (
    <button onClick={handleSave} className="btn btn-primary">
      Guardar Artículo
    </button>
  );
};

export default SaveArticleButton;
