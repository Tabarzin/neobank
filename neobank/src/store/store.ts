// import { configureStore } from '@reduxjs/toolkit';
// import exchangeRatesReducer from './exchangeRatesSlice';
// import newsSliceReducer from './newsSlice';
// import loanApplicationReducer from './loanApplicationSlice';

// export const store = configureStore({
//   reducer: {
//     exchangeRates: exchangeRatesReducer,
//     news: newsSliceReducer,
//     loanApplication: loanApplicationReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice';
import newsSliceReducer from './newsSlice';
import loanApplicationReducer, { LoanApplicationState } from './loanApplicationSlice';

const loadLoanApplicationState = (): LoanApplicationState | undefined => {
  try {
    const serializedState = localStorage.getItem('loanApplicationState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
    news: newsSliceReducer,
    loanApplication: loanApplicationReducer,
  },
  preloadedState: {
    loanApplication: loadLoanApplicationState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('loanApplicationState', JSON.stringify(state.loanApplication));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
