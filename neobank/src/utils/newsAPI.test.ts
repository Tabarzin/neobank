import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchNews } from './newsAPI';
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } from '@store/newsSlice';
import { Dispatch } from 'redux';

vi.mock('axios');

describe('fetchNews thunk', () => {
  it('dispatches fetchNewsStart and fetchNewsSuccess on successful API call', async () => {
    const mockDispatch = vi.fn() as Dispatch;
    const mockResponse = {
      data: {
        articles: [
          {
            urlToImage: 'image-url',
            title: 'Test Title',
            url: 'test-url',
            description: 'Test description',
          },
        ],
      },
    };

    (axios.get as vi.Mock).mockResolvedValue(mockResponse);

    await fetchNews()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchNewsStart());
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchNewsSuccess([
        {
          urlToImage: 'image-url',
          title: 'Test Title',
          url: 'test-url',
          description: 'Test description',
        },
      ]),
    );
  });

  it('dispatches fetchNewsStart and fetchNewsFailure on failed API call', async () => {
    const mockDispatch = vi.fn() as Dispatch;
    const mockError = new Error('Network error');

    (axios.get as vi.Mock).mockRejectedValue(mockError);

    await fetchNews()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchNewsStart());
    expect(mockDispatch).toHaveBeenCalledWith(fetchNewsFailure('Network error'));
  });
});
