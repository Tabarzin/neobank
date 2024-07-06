import Button from '@components/Button/Button';
import './CreditCardHero.scss';
import { useNavigate } from 'react-router-dom';
import creditCard from '@assets/images/credit-card_cardImage1.svg';

const CreditCardHero: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('#credit-card-form');
  };

  return (
    <section className="credit-card-hero-content">
      <div className="credit-card-hero">
        <div className="credit-card-hero-text">
          <h1 className="credit-card-hero_h1">Platinum digital credit card</h1>
          <p className="credit-card-hero-s">
            Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without
            commission and interest.
          </p>
          <div className="credit-card-conditions">
            <div className="conditions-item">
              <span className="conditions-item-m">Up to 160 days</span>
              <span className="conditions-item-s">No percent</span>
            </div>
            <div className="conditions-item">
              <span className="conditions-item-m">Up to 600 000 </span>
              <span className="conditions-item-s">Credit limit</span>
            </div>
            <div className="conditions-item">
              <span className="conditions-item-m">0 ₽</span>
              <span className="conditions-item-s">Card service is free</span>
            </div>
          </div>
          <Button onClick={handleClick}>Apply for card</Button>
        </div>
        <img src={creditCard} alt="Credit Card" />
      </div>
    </section>
  );
};

export default CreditCardHero;
