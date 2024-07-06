import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewsArticle {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
}

interface NewsState {
  articles: NewsArticle[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  status: 'idle',
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart: (state) => {
      state.status = 'loading';
    },
    fetchNewsSuccess: (state, action: PayloadAction<NewsArticle[]>) => {
      state.status = 'succeeded';
      state.articles = action.payload;
      state.error = null;
    },
    fetchNewsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } = newsSlice.actions;

export default newsSlice.reducer;

export const selectAllNews = (state: { news: NewsState }) => state.news.articles;
export const selectNewsStatus = (state: { news: NewsState }) => state.news.status;
export const selectNewsError = (state: { news: NewsState }) => state.news.error;
