import React from "react";
import { saveArticle } from "../services/api";
import { notify } from "../services/notification";

interface Props {
  title: string;
  url: string;
  summary: string;
  onSaved?: () => void;
}

const SaveArticleButton: React.FC<Props> = ({
  title,
  url,
  summary,
  onSaved,
}) => {
  const handleSave = async () => {
    try {
      await saveArticle(title, url, summary);
      notify.success("Artículo guardado exitosamente");
      onSaved?.();
    } catch (err: any) {
      console.error("saveArticle error:", err.response ?? err);
      notify.error("Error al guardar el artículo");
    }
  };

  return (
    <button onClick={handleSave} className="btn btn-success mb-4">
      Guardar Artículo
    </button>
  );
};

export default SaveArticleButton;
