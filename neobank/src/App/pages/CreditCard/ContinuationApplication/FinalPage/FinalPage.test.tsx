import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FinalPage from './FinalPage';
import loanApplicationSlice from '@store/loanApplicationSlice';
import loanApplicationContinuationSlice from '@store/loanApplicationContinuationSlice';
import { vi } from 'vitest';

const mockStore = configureStore({
  reducer: {
    loanApplication: loanApplicationSlice.reducer,
    loanApplicationContinuation: loanApplicationContinuationSlice.reducer,
  },
});

const MockFinalPage = () => {
  const navigate = useNavigate();
  vi.spyOn(window.history, 'pushState').mockImplementation((_, __, newUrl) => {
    navigate(newUrl);
  });

  return <FinalPage />;
};

describe('FinalPage', () => {
  it('should render the congratulations message', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FinalPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Congratulations! You have completed your new credit card!')).toBeInTheDocument();
  });

  it('should navigate to the home page on button click', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MockFinalPage />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'View other offers of our bank' });
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
