import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import News from './News';
import { useNews } from '@customHooks/useNews';

vi.mock('@customHooks/useNews');

describe('News', () => {
  it('should render the news section', () => {
    (useNews as jest.Mock).mockReturnValue({
      news: [
        {
          urlToImage: 'https://example.com/image.jpg',
          title: 'News Article 1',
          description: 'This is the description of the news article.',
          url: 'https://example.com/article1',
        },
      ],
      status: 'succeeded',
      error: null,
      fetchNews: vi.fn(),
    });

    render(<News />);

    expect(screen.getByText('Current news from the world of finance')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('News Article 1')).toBeInTheDocument();
  });

  it('should show the error message when status is "failed"', () => {
    (useNews as jest.Mock).mockReturnValue({
      news: [],
      status: 'failed',
      error: 'Failed to fetch news',
      fetchNews: vi.fn(),
    });

    render(<News />);

    expect(screen.getByText('Error: Failed to fetch news')).toBeInTheDocument();
  });
});
