import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import ArticleDetail from "./components/ArticleDetail";
import { WikiSearchResult, WikiDetail } from "./types";
import { searchWikipedia, getWikiDetail } from "./services/api";

const App: React.FC = () => {
  const [results, setResults] = useState<WikiSearchResult[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<WikiDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [savedArticles, setSavedArticles] = useState<WikiDetail[]>([]);

  const handleSearch = async (term: string) => {
    setError(null);
    setSelectedDetail(null);
    setLoading(true);
    try {
      const response = await searchWikipedia(term);
      setResults(response.results);
    } catch (e: any) {
      console.error(e);
      setError("Error al buscar en Wikipedia. Intenta nuevamente.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (pageid: number, title: string) => {
    setError(null);
    setLoading(true);
    try {
      const detailResponse = await getWikiDetail(pageid, title);
      const detail: WikiDetail = {
        ...detailResponse,
        pageid,
        analysis: {
          ...detailResponse.analysis,
          top_words: detailResponse.analysis.top_words ?? [],
        },
      };
      setSelectedDetail(detail);
    } catch (e: any) {
      console.error(e);
      setError("Error al obtener detalle del artículo.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedDetail(null);
  };

  const handleSaveArticle = (article: WikiDetail) => {
    if (!savedArticles.some((a) => a.pageid === article.pageid)) {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const handleRemoveArticle = (pageid: number) => {
    setSavedArticles(savedArticles.filter((a) => a.pageid !== pageid));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Wiki-Analyzer (React + FastAPI)
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Cargando...</p>}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {selectedDetail ? (
        <ArticleDetail
          detail={selectedDetail}
          onBack={handleBack}
          onSave={handleSaveArticle}
        />
      ) : (
        <>
          {results.length > 0 && (
            <>
              <h2 style={{ marginTop: "1rem" }}>Resultados de búsqueda:</h2>
              <SearchResults
                results={results}
                onSelect={(pageid: number) => {
                  const selected = results.find((r) => r.pageid === pageid);
                  if (selected) {
                    handleSelect(pageid, selected.title);
                  }
                }}
              />
            </>
          )}

          <div style={{ margin: "2rem 0" }}>
            <h2>Mis Artículos Guardados</h2>
            {savedArticles.length === 0 ? (
              <p>No hay artículos guardados.</p>
            ) : (
              <ul>
                {savedArticles.map((article) => (
                  <li key={article.pageid} style={{ marginBottom: "0.5rem" }}>
                    <a
                      href={`https://es.wikipedia.org/?curid=${article.pageid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                    <button
                      style={{ marginLeft: "1rem" }}
                      onClick={() => handleRemoveArticle(article.pageid)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
