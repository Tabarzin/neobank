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

  let buttonText = 'Apply for card';
  let targetId = 'credit-card-form';

  if (showOffers) {
    buttonText = 'Choose an offer';
    targetId = 'loan-offers';
  } else if (showConfirmation) {
    buttonText = 'Continue registration';
    targetId = 'confirmation';
  }
  return (
    <div>
      <Header />
      <div className="main">
        <CreditCardHero buttonText={buttonText} targetId={targetId} />
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
