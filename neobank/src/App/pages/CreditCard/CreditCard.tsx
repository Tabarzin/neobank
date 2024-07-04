import Header from '@components/Header';
import CardInfo from './CardInfo/CardInfo';
import './CreditCard.scss';
import CreditCardHero from './CreditCardHero/CreditCardHero';
import GetCard from './GetCard/GetCard';

const CreditCard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <CreditCardHero />
        <CardInfo />
        <GetCard />
      </div>
    </div>
  );
};

export default CreditCard;
