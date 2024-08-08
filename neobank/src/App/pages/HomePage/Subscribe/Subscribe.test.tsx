import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Subscribe from './Subscribe';

vi.mock('axios');

describe('Subscribe', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the component', () => {
    render(<Subscribe />);
    expect(screen.getByText('Subscribe Newsletter & get Bank News')).toBeInTheDocument();
  });

  it('should subscribe user successfully', async () => {
    const mockResponse = { data: { message: 'Subscription successful' } };
    vi.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

    render(<Subscribe />);
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Subscribe'));

    await waitFor(() => {
      expect(screen.getByText("You are already subscribed to the bank's newsletter")).toBeInTheDocument();
      expect(localStorage.getItem('isSubscribed')).toBe('true');
    });
  });

  it('should restore subscription status from localStorage', () => {
    localStorage.setItem('isSubscribed', 'true');
    render(<Subscribe />);
    expect(screen.getByText("You are already subscribed to the bank's newsletter")).toBeInTheDocument();
  });
});
