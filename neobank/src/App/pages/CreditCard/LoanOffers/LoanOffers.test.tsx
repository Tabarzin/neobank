import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import LoanOffers from './LoanOffers';
import loanApplicationReducer from '@store/loanApplicationSlice';
import { render, screen } from '@testing-library/react';

const mockReducer = loanApplicationReducer;

const mockStore = configureStore({
  reducer: {
    loanApplication: mockReducer,
  },
  preloadedState: {
    loanApplication: {
      loanOffers: [
        {
          applicationId: 1,
          requestedAmount: 500000,
          totalAmount: 600000,
          term: 36,
          monthlyPayment: 20000,
          rate: 7.5,
          isInsuranceIncluded: true,
          isSalaryClient: false,
        },
      ],
      selectedOffer: null,
    },
  },
});

describe('LoanOffers Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    );
  });

  it('renders LoanOfferCard components with mock data', () => {
    render(
      <Provider store={mockStore}>
        <LoanOffers />
      </Provider>,
    );

    expect(screen.getByText('Requested amount: 500,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Total amount: 600,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('For 36 months')).toBeInTheDocument();
    expect(screen.getByText('Monthly payment: 20,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Your rate: 7.5%')).toBeInTheDocument();
  });
});
