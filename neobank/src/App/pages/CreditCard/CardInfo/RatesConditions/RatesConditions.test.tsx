import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import RatesConditions from './RatesConditions';

describe('RatesConditions', () => {
  beforeEach(() => {
    render(<RatesConditions />);
  });

  it('renders correct condition labels', () => {
    expect(screen.getByText('Card currency')).toBeInTheDocument();
    expect(screen.getByText('Interest free period')).toBeInTheDocument();
    expect(screen.getByText('Payment system')).toBeInTheDocument();
    expect(screen.getByText('Maximum credit limit on the card')).toBeInTheDocument();
    expect(screen.getByText('Replenishment and withdrawal')).toBeInTheDocument();
    expect(screen.getByText('Max cashback per month')).toBeInTheDocument();
    expect(screen.getByText('Transaction Alert')).toBeInTheDocument();
  });

  it('renders correct condition values', () => {
    expect(screen.getByText('Rubles, dollars, euro')).toBeInTheDocument();
    expect(screen.getByText('0% up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('Mastercard, Visa')).toBeInTheDocument();
    expect(screen.getByText('600 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('15 000 ₽')).toBeInTheDocument();
    expect(screen.getByText(/60 ₽ — SMS or push notifications/)).toBeInTheDocument();
  });

  it('renders replenishment and withdrawal information', () => {
    expect(
      screen.getByText(/At any ATM. Top up your credit card for free with cash or transfer from other cards/),
    ).toBeInTheDocument();
  });

  it('renders transaction alert information', () => {
    expect(
      screen.getByText(/0 ₽ — card statement, information about transactions in the online bank/),
    ).toBeInTheDocument();
  });
});
