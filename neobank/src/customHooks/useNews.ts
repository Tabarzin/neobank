import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  NewsArticle,
  selectAllNews,
  selectNewsStatus,
  selectNewsError,
} from '@store/newsSlice';

const API_KEY = '7c5a94e9fa3041fb8745c31cd85d8835';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

export const useNews = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectAllNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);

  const fetchNews = useCallback(async () => {
    dispatch(fetchNewsStart());
    try {
      const response = await axios.get(API_URL);
      const articles = response.data.articles.map((article: NewsArticle) => ({
        urlToImage: article.urlToImage,
        title: article.title,
        url: article.url,
        description: article.description,
      }));
      dispatch(fetchNewsSuccess(articles));
    } catch (error) {
      dispatch(fetchNewsFailure(error instanceof Error ? error.message : 'An error occurred'));
    }
  }, [dispatch]);

  return { news, status, error, fetchNews };
};
