import React from "react";
import { WikiDetail } from "../types";

interface Props {
  detail: WikiDetail;
  onBack: () => void;
  onSave: (article: WikiDetail) => void;
}

const ArticleDetail: React.FC<Props> = ({ detail, onBack, onSave }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "1rem",
          padding: "0.4rem 0.8rem",
          fontSize: "0.9rem",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Volver a resultados
      </button>

      <h2 style={{ marginBottom: "0.5rem" }}>{detail.title}</h2>
      <p>
        <strong>URL original:</strong>{" "}
        <a href={detail.url} target="_blank" rel="noopener noreferrer">
          {detail.url}
        </a>
      </p>

      <a
        href={`https://es.wikipedia.org/?curid=${detail.pageid}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", margin: "1rem 0" }}
      >
        Enlace al artículo original
      </a>

      <button
        onClick={() => onSave(detail)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#d1e7dd",
          border: "1px solid #0f5132",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Guardar Artículo
      </button>

      <h3>Resumen</h3>
      <p style={{ lineHeight: "1.6" }}>{detail.summary}</p>

      <h3>Análisis</h3>
      <p>
        <strong>Recuento de palabras:</strong> {detail.analysis.word_count}
      </p>
      <p>
        <strong>Palabras más frecuentes:</strong>
      </p>
      <ul>
        {detail.analysis.top_words.map(([word, freq]) => (
          <li key={word}>
            {word} — {freq} {freq > 1 ? "veces" : "vez"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleDetail;
