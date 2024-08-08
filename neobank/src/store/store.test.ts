import { describe, it, expect } from 'vitest';
import { store } from './store';
import { fetchRatesSuccess } from './exchangeRatesSlice';

describe('Redux Store', () => {
  it('should handle actions and update state', () => {
    const mockRates = { USD: '1.00', EUR: '0.90' };
    store.dispatch(fetchRatesSuccess(mockRates));

    const state = store.getState();

    expect(state.exchangeRates.rates).toEqual(mockRates);
    expect(state.exchangeRates.status).toBe('succeeded');
  });
});
