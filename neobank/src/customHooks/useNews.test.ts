import { renderHook, act } from '@testing-library/react';
import { vi, expect, test, beforeEach } from 'vitest';
import axios from 'axios';
import { useNews } from './useNews';
import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  NewsArticle,
  selectAllNews,
  selectNewsStatus,
  selectNewsError,
} from '@store/newsSlice';

vi.mock('axios');

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: Function) => mockUseSelector(selector),
}));

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  vi.clearAllMocks();
});

test('should dispatch fetchNewsStart and fetchNewsSuccess on successful API call', async () => {
  const mockArticles: NewsArticle[] = [
    {
      urlToImage: 'http://example.com/image1.jpg',
      title: 'Article 1',
      url: 'http://example.com/article1',
      description: 'Description 1',
    },
    {
      urlToImage: 'http://example.com/image2.jpg',
      title: 'Article 2',
      url: 'http://example.com/article2',
      description: 'Description 2',
    },
  ];

  mockAxios.get.mockResolvedValue({ data: { articles: mockArticles } });

  mockUseSelector.mockImplementation((selector: Function) => {
    if (selector === selectAllNews) return [];
    if (selector === selectNewsStatus) return 'idle';
    if (selector === selectNewsError) return null;
    return null;
  });

  const { result } = renderHook(() => useNews());

  await act(async () => {
    await result.current.fetchNews();
  });

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenCalledWith(fetchNewsStart());

  expect(mockDispatch).toHaveBeenCalledWith(fetchNewsSuccess(mockArticles));
});

test('should dispatch fetchNewsStart and fetchNewsFailure on API error', async () => {
  mockAxios.get.mockRejectedValue(new Error('API Error'));

  mockUseSelector.mockImplementation((selector: Function) => {
    if (selector === selectAllNews) return [];
    if (selector === selectNewsStatus) return 'idle';
    if (selector === selectNewsError) return null;
    return null;
  });

  const { result } = renderHook(() => useNews());

  await act(async () => {
    await result.current.fetchNews();
  });

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenCalledWith(fetchNewsStart());
  expect(mockDispatch).toHaveBeenCalledWith(fetchNewsFailure('API Error'));
});
