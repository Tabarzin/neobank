import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExchangeRates {
  [key: string]: string;
}

interface ExchangeRatesState {
  rates: ExchangeRates;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExchangeRatesState = {
  rates: {},
  status: 'idle',
  error: null,
};

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    fetchRatesStart: (state) => {
      state.status = 'loading';
    },
    fetchRatesSuccess: (state, action: PayloadAction<ExchangeRates>) => {
      state.status = 'succeeded';
      state.rates = action.payload;
      state.error = null;
    },
    fetchRatesFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchRatesStart, fetchRatesSuccess, fetchRatesFailure } = exchangeRatesSlice.actions;

export default exchangeRatesSlice.reducer;
