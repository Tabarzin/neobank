import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import CreditCard from './CreditCard';

const mockLoanApplicationSlice = createSlice({
  name: 'loanApplication',
  initialState: {
    showOffers: false,
    showConfirmation: false,
  },
  reducers: {
    showLoanOffers: (state) => {
      state.showOffers = true;
      state.showConfirmation = false;
    },
    showConfirmation: (state) => {
      state.showOffers = false;
      state.showConfirmation = true;
    },
  },
});

const mockStore = configureStore({
  reducer: {
    loanApplication: mockLoanApplicationSlice.reducer,
  },
});

describe('CreditCard', () => {
  it('renders the main components', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreditCard />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('renders the ApplyForm component when showOffers and showConfirmation are false', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreditCard />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Apply for card')).toBeInTheDocument();
    expect(screen.queryByText('Choose an offer')).not.toBeInTheDocument();
    expect(screen.queryByText('Continue registration')).not.toBeInTheDocument();
  });

  it('renders the Confirmation component when showConfirmation is true', () => {
    mockStore.dispatch(mockLoanApplicationSlice.actions.showConfirmation());

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreditCard />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText('Apply for card')).not.toBeInTheDocument();
    expect(screen.queryByText('Choose an offer')).not.toBeInTheDocument();
    expect(screen.getByText('Continue registration')).toBeInTheDocument();
  });
});
