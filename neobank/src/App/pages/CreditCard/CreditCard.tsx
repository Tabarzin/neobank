import Footer from '@components/Footer/Footer';
import { RootState } from '@store/store';
import Header from '@components/Header';
import { useSelector } from 'react-redux';
import ApplyForm from './ApplyForm/ApplyForm';
import CardInfo from './CardInfo/CardInfo';
import './CreditCard.scss';
import CreditCardHero from './CreditCardHero/CreditCardHero';
import GetCard from './GetCard/GetCard';
import LoanOffers from './LoanOffers/LoanOffers';
import Confirmation from './LoanOffers/Confirmation/Confirmation';

const CreditCard: React.FC = () => {
  const { showOffers, showConfirmation } = useSelector((state: RootState) => state.loanApplication);
  return (
    <div>
      <Header />
      <div className="main">
        <CreditCardHero />
        <CardInfo />
        <GetCard />
        {!showOffers && !showConfirmation && <ApplyForm />}
        {showOffers && <LoanOffers />}
        {showConfirmation && <Confirmation />}

        <Footer />
      </div>
    </div>
  );
};

export default CreditCard;
