import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice';
import newsSliceReducer from './newsSlice';
import loanApplicationReducer from './loanApplicationSlice';

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
    news: newsSliceReducer,
    loanApplication: loanApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
