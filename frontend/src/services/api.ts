import axios from "axios";
import type {
  WikiSearchResponse,
  WikiDetailResponse,
  SavedArticle,
} from "../types";

// Base URL del backend
const API_BASE = "http://localhost:8000";

export const searchWikipedia = async (
  term: string
): Promise<WikiSearchResponse> => {
  const resp = await axios.get<WikiSearchResponse>(`${API_BASE}/wiki/search`, {
    params: { term },
  });
  return resp.data;
};

export const getWikiDetail = async (
  pageid: number,
  title: string
): Promise<WikiDetailResponse> => {
  const resp = await axios.get<WikiDetailResponse>(
    `${API_BASE}/wiki/detail`,
    {
      params: { pageid, title },
    }
  );
  return resp.data;
};

export const getSavedArticles = async (): Promise<SavedArticle[]> => {
  const resp = await axios.get<SavedArticle[]>(`${API_BASE}/articles/`);
  return resp.data;
};

export const saveArticle = async (
  title: string,
  url: string,
  processed_summary: string
): Promise<SavedArticle> => {
  const resp = await axios.post<SavedArticle>(`${API_BASE}/articles/`, {
    title,
    url,
    processed_summary,
  });
  return resp.data;
};

export const deleteSavedArticle = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/articles/${id}`);
};


export interface ArticleCreate {
  titulo_wikipedia: string;
  url_wikipedia: string;
  resumen_procesado: string;
}

export interface Article {
  id?: number;
  titulo_wikipedia: string;
  url_wikipedia: string;
  resumen_procesado: string;
}


// Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000", // Cambia si tu backend está en otra URL
});

export const deleteArticle = (id: number) =>
  API.delete<{ message: string }>(`/articles/${id}`);

