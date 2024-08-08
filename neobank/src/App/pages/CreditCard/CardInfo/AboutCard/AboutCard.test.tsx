import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AboutCard from './AboutCard';

describe('AboutCard', () => {
  beforeEach(() => {
    render(<AboutCard />);
  });

  it('renders all cards with correct text and icons', () => {
    const card1 = screen.getByText(/Up to 50 000/i);
    expect(card1).toBeInTheDocument();
    expect(card1.nextElementSibling).toHaveTextContent(/Cash and transfers without commission and percent/i);

    const card2 = screen.getByText(/Up to 160 days/i);
    expect(card2).toBeInTheDocument();
    expect(card2.nextElementSibling).toHaveTextContent(/Without percent on the loan/i);

    const card3 = screen.getByText(/Free delivery/i);
    expect(card3).toBeInTheDocument();
    expect(card3.nextElementSibling).toHaveTextContent(
      /We will deliver your card by courier at a convenient place and time for you/i,
    );

    const card4 = screen.getByText(/Up to 12 months/i);
    expect(card4).toBeInTheDocument();
    expect(card4.nextElementSibling).toHaveTextContent(
      /No percent. For equipment, clothes and other purchases in installments/i,
    );

    const card5 = screen.getByText(/Convenient deposit and withdrawal/i);
    expect(card5).toBeInTheDocument();
    expect(card5.nextElementSibling).toHaveTextContent(
      /At any ATM. Top up your credit card for free with cash or transfer from other cards/i,
    );
  });

  it('renders all icons', () => {
    const icons = ['Money Icon', 'Calendar Icon', 'Clock Icon', 'Bag Icon', 'Credit card Icon'];

    icons.forEach((icon) => {
      const img = screen.getByAltText(icon);
      expect(img).toBeInTheDocument();
    });
  });
});
