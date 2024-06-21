import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice';

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
