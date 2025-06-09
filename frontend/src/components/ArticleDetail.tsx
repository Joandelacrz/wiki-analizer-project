import React from "react";
import { WikiDetail } from "../types";
import SaveArticleButton from "./SaveArticleButton";
import styles from "../styles/ArticleDetail.module.css";

interface Props {
  detail: WikiDetail;
  onBack: () => void;
  onSaved?: (article: WikiDetail) => void;
}

const ArticleDetail: React.FC<Props> = ({ detail, onBack, onSaved }) => {
  const topWords = detail.analysis.top_words.slice(0, 10);
  const handleSaveSuccess = () => onSaved?.(detail);

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className={styles.title}>{detail.title}</h1>
        <button onClick={onBack} className="btn btn-outline-secondary btn-sm">
          ← Volver
        </button>
      </div>

      <p className="mb-2">
        <strong>URL original:</strong>{" "}
        <a
          href={detail.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.url}
        >
          {detail.url}
        </a>
      </p>

      <SaveArticleButton
        title={detail.title}
        url={detail.url}
        summary={detail.summary}
        onSaved={handleSaveSuccess}
      />

      <section className="mb-4">
        <h2 className={styles.sectionTitle}>Resumen</h2>
        <p className={styles.summary}>{detail.summary}</p>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Análisis</h2>
        <p className="mb-3">
          <strong>Recuento de palabras:</strong> {detail.analysis.word_count}
        </p>
        <p className={styles.subtitle}>
          <strong>Palabras más frecuentes:</strong>
        </p>
        <ul className={styles.wordList}>
          {topWords.map(([word, freq]) => (
            <li key={word} className="d-flex justify-content-between">
              <span>{word}</span>
              <span className="badge bg-primary">{freq}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ArticleDetail;
