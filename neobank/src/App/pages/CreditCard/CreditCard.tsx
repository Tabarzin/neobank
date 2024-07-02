import Header from '@components/Header';
import CardInfo from './CardInfo/CardInfo';
import './CreditCard.scss';
import CreditCardHero from './CreditCardHero/CreditCardHero';

const CreditCard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <CreditCardHero />
        <CardInfo />
      </div>
    </div>
  );
};

export default CreditCard;
