import { render, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SignPage from './SignPage';

describe('SignPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Router>
        <SignPage />
      </Router>,
    );

    expect(screen.getByText(/Signing of documents/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 4 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeDisabled();
  });

  it('enables the send button when the checkbox is checked', () => {
    render(
      <Router>
        <SignPage />
      </Router>,
    );

    const checkbox = screen.getByLabelText(/I agree/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.click(checkbox);

    expect(button).toBeEnabled();
  });
});
