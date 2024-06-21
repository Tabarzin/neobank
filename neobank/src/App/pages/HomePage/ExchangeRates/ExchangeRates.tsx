import './ExchangeRates.scss';
import bank from '@assets/images/bank.svg';

import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useExchangeRates } from '@customHooks/useExchangeRates';

const ExchangeRates: React.FC = () => {
  const { rates, status, error } = useSelector((state: RootState) => state.exchangeRates);
  useExchangeRates();

  const renderRateValue = (rate: string | undefined) => {
    if (status === 'loading' && !rate) {
      return <span className="exchange-content__rates_rate loading">Loading...</span>;
    }
    if (error) {
      return <span className="exchange-content__rates_rate error">Error</span>;
    }
    return <span className="exchange-content__rates_rate">{rate || 'N/A'}</span>;
  };

  return (
    <section className="exchange">
      <div className="exchange-content">
        <div className="exchange-content__titles">
          <h3 className="exchange-content__titles_h3">Exchange rate in internet bank</h3>
          <span className="exchange-content__titles_subtitle">
            Update every 15 minutes, MSC {new Date().toLocaleDateString()}
          </span>
        </div>
        <span className="exchange-content__currency">Currency</span>
        <div className="exchange-content__rates">
          <div className="exchange-content__rates_grid">
            {['USD', 'EUR', 'GBP', 'JPY', 'MXN', 'CNH'].map((currency) => (
              <div key={currency} className="exchange-content__rates_item">
                <span className="exchange-content__rates_currency">{currency}:</span>
                {renderRateValue(rates[currency])}
              </div>
            ))}
          </div>
          <img src={bank} alt="Bank" className="exchange-content__rates_image" />
        </div>
        <a href="#" className="exchange-content__link">
          All courses
        </a>
      </div>
    </section>
  );
};

export default ExchangeRates;
