import Footer from '@/components/Footer/Footer';
import Header from '@components/Header';
import ApplyFrom from './ApplyForm/ApplyForm';
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
        <ApplyFrom />
        <Footer />
      </div>
    </div>
  );
};

export default CreditCard;
