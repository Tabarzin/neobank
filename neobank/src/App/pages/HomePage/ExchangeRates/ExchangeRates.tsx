import './ExchangeRates.scss';
import bank from '@assets/images/bank.svg';

const ExchangeRates = () => {
  return (
    <section className="exchange">
      <div className="exchange-content">
        <div className="exchange-content__titles">
          <h3 className="exchange-content__titles_h3">Exchange rate in internet bank</h3>
          <span className="exchange-content__titles_subtitle"> Update every 15 minutes, MSC 09.08.2022</span>
        </div>
        <span className="exchange-content__currency">Currency</span>
        <div className="exchange-content__rates">
          <div className="exchange-content__rates_grid">
            <div className="exchange__rates_item">
              <span className="exchange-content__rates_currency">USD:</span>
              <span className="exchange-content__rates_rate">60.78</span>
            </div>
            <div className="exchange-content__rates_item">
              <span className="exchange-content__rates_currency">CNY:</span>
              <span className="exchange-content__rates_rate">9.08</span>
            </div>
            <div className="exchange-content__rates_item">
              <span className="exchange-content__rates_currency">CHF:</span>
              <span className="exchange-content__rates_rate">64.78</span>
            </div>
            <div className="exchange-content__rates_item">
              <span className="exchange-content__rates_currency">USD:</span>
              <span className="exchange-content__rates_rate">60.78</span>
            </div>
            <div className="exchange-content__rates_item">
              <span className="exchange-content__rates_currency">JPY:</span>
              <span className="exchange-content__rates_rate">0.46</span>
            </div>
            <div className="exchange-content__rates_item">
              <span className="exchange-content__rates_currency">TRY:</span>
              <span className="exchange-content__rates_rate">3.39</span>
            </div>
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
