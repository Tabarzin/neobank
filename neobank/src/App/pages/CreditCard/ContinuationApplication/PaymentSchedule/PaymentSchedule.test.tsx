import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import PaymentSchedule from './PaymentSchedule';
import { vi } from 'vitest';

vi.mock('axios');
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    MemoryRouter: ({ children }) => <actual.MemoryRouter>{children}</actual.MemoryRouter>,
    useParams: () => ({ applicationId: '123' }),
  };
});

const mockStore = configureStore({
  reducer: {},
});

describe('PaymentSchedule', () => {
  it('should render the payment schedule table', async () => {
    const mockData = [
      {
        number: 1,
        date: '2023-05-01',
        totalPayment: 100.0,
        interestPayment: 10.0,
        debtPayment: 90.0,
        remainingDebt: 1000.0,
      },
    ];

    vi.spyOn(axios, 'get').mockResolvedValue({ data: { credit: { paymentSchedule: mockData } } });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PaymentSchedule />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Payment Schedule')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2023-05-01')).toBeInTheDocument();
      expect(screen.getByText('100.00')).toBeInTheDocument();
      expect(screen.getByText('10.00')).toBeInTheDocument();
      expect(screen.getByText('90.00')).toBeInTheDocument();
      expect(screen.getByText('1000.00')).toBeInTheDocument();
    });
  });
});
