import { useExchangeRates } from './useExchangeRates';
import { vi, expect, test, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchRatesStart, fetchRatesSuccess, fetchRatesFailure } from '@store/exchangeRatesSlice';
import { act, renderHook } from '@testing-library/react';

vi.mock('axios');

const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  vi.clearAllMocks();
});

test('should dispatch fetchRatesStart and fetchRatesSuccess on successful API call', async () => {
  const mockRates = {
    USD: '1.00',
    EUR: '1.00',
    GBP: '1.00',
    JPY: '1.00',
    MXN: '1.00',
    CNH: '1.00',
  };

  mockAxios.request.mockResolvedValue({ data: 1.0 });

  mockDispatch.mockImplementation(() => {});

  const { result } = renderHook(() => useExchangeRates());

  await act(async () => {
    await result.current.fetchRates();
  });

  expect(mockDispatch).toHaveBeenCalledWith(fetchRatesStart());
  expect(mockDispatch).toHaveBeenCalledWith(fetchRatesSuccess(mockRates));
});

test('should dispatch fetchRatesStart and fetchRatesFailure on API error', async () => {
  mockAxios.request.mockRejectedValue(new Error('API Error'));

  mockDispatch.mockImplementation(() => {});

  const { result } = renderHook(() => useExchangeRates());

  await act(async () => {
    await result.current.fetchRates();
  });

  expect(mockDispatch).toHaveBeenCalledWith(fetchRatesStart());
  expect(mockDispatch).toHaveBeenCalledWith(fetchRatesFailure('API Error'));
});
