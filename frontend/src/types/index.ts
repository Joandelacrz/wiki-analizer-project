export interface WikiSearchItem {
  pageid: number;
  title: string;
}

export interface WikiSearchResponse {
  results: WikiSearchItem[];
}

export interface WikiAnalyze {
  word_count: number;
  top_words: Array<[string, number]>;
}



export interface WikiDetailResponse {
  title: string;
  summary: string;
  analysis: WikiAnalyze;
  url: string;
}

export interface SavedArticle {
  id: number;
  title: string;
  url: string;
  processed_summary: string;
  date_saved: string;
}

// frontend/src/types/index.ts

export interface WikiSearchResult {
  pageid: number;
  title: string;
}

export interface WikiDetail {
  pageid: number;
  title: string;
  summary: string;
  analysis: {
    word_count: number;
    top_words: Array<[string, number]>;
  };
  url: string;
}
