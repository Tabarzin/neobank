// useExchangeRates.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchRatesStart, fetchRatesSuccess, fetchRatesFailure } from '@store/exchangeRatesSlice';

interface CurrencyPair {
  from: string;
  to: string;
}

const currencyPairs: CurrencyPair[] = [
  { from: 'USD', to: 'RUB' },
  { from: 'EUR', to: 'RUB' },
  { from: 'GBP', to: 'RUB' },
  { from: 'JPY', to: 'RUB' },
  { from: 'MXN', to: 'RUB' },
  { from: 'CNH', to: 'RUB' },
];

export const useExchangeRates = () => {
  const dispatch = useDispatch();

  const fetchRates = async () => {
    dispatch(fetchRatesStart());
    const rates: { [key: string]: string } = {};

    try {
      for (const pair of currencyPairs) {
        const options = {
          method: 'GET',
          url: 'https://currency-exchange.p.rapidapi.com/exchange',
          params: {
            from: pair.from,
            to: pair.to,
            q: '1.0',
          },
          headers: {
            'X-RapidAPI-Key': '0949ae0546mshaa273642ad8f4abp1439ddjsn6593e102e36a',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
          },
        };

        const response = await axios.request<number>(options);
        rates[pair.from] = response.data.toFixed(2);
      }

      dispatch(fetchRatesSuccess(rates));
    } catch (error) {
      dispatch(fetchRatesFailure(error instanceof Error ? error.message : 'An error occurred'));
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 900000);
    return () => clearInterval(interval);
  }, []);

  return { fetchRates };
};
