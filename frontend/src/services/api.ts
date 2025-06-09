
import axios from "axios";
import type { WikiSearchResponse, WikiDetailResponse, SavedArticle } from "../types";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const searchWikipedia = async (term: string): Promise<WikiSearchResponse> => {
  const resp = await axios.get<WikiSearchResponse>(`${API_BASE}/wiki/search`, {
    params: { term },
  });
  return resp.data;
};

export const getWikiDetail = async (
  pageid: number,
  title: string
): Promise<WikiDetailResponse> => {
  const resp = await axios.get<WikiDetailResponse>(`${API_BASE}/wiki/detail`, {
    params: { pageid, title },
  });
  return resp.data;
};

export const getSavedArticles = async (): Promise<SavedArticle[]> => {
  const resp = await axios.get<SavedArticle[]>(`${API_BASE}/articles`);
  return resp.data;
};

export const saveArticle = async (
  title: string,
  url: string,
  processed_summary: string
): Promise<SavedArticle> => {
  const resp = await axios.post<SavedArticle>(`${API_BASE}/articles`, {
    title,
    url,
    processed_summary,
  });
  return resp.data;
};

export const deleteSavedArticle = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/articles/${id}`);
};
