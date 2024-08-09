import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import FAQ from './FAQ';

describe('FAQ', () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it('renders FAQ group titles', () => {
    expect(screen.getByText('Issuing and receiving a card')).toBeInTheDocument();
    expect(screen.getByText('Using a credit card')).toBeInTheDocument();
  });

  it('renders FAQ questions', () => {
    expect(screen.getByText('How to get a card?')).toBeInTheDocument();
    expect(screen.getByText('What is an interest free credit card?')).toBeInTheDocument();
  });

  it('toggles FAQ answers when questions are clicked', () => {
    const question = screen.getByText('How to get a card?');
    fireEvent.click(question);
    expect(screen.getByText(/We will deliver your card by courier free of charge/)).toBeInTheDocument();

    fireEvent.click(question);
    expect(screen.queryByText(/We will deliver your card by courier free of charge/)).not.toBeInTheDocument();
  });

  it('displays correct icon when FAQ item is open or closed', () => {
    const question = screen.getByText('How to get a card?');
    const icon = question.nextElementSibling as HTMLElement;

    expect(icon.textContent).toBe('▼');
    fireEvent.click(question);
    expect(icon.textContent).toBe('▲');
  });
});
