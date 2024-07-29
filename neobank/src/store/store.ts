import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice';
import newsSliceReducer from './newsSlice';
import loanApplicationReducer, { defaultInitialState, LoanApplicationState } from './loanApplicationSlice';
import applicationReducer from './loanApplicationContinuationSlice';

// const loadLoanApplicationState = (): LoanApplicationState | undefined => {
//   try {
//     const serializedState = localStorage.getItem('loanApplicationState');
//     if (serializedState === null) {
//       return defaultInitialState;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.error('Error loading state:', err);
//     return defaultInitialState;
//   }
// };

const loadLoanApplicationState = (): LoanApplicationState => {
  try {
    const serializedState = localStorage.getItem('loanApplicationState');
    if (serializedState === null) {
      return defaultInitialState;
    }
    return JSON.parse(serializedState) as LoanApplicationState;
  } catch (err) {
    console.error('Error loading state:', err);
    return defaultInitialState;
  }
};

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
    news: newsSliceReducer,
    loanApplication: loanApplicationReducer,
    loanApplicationCont: applicationReducer,
  },
  preloadedState: {
    loanApplication: loadLoanApplicationState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('loanApplicationState', JSON.stringify(state.loanApplication));
  localStorage.setItem('loanApplicationContinuationState', JSON.stringify(state.loanApplicationCont));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
