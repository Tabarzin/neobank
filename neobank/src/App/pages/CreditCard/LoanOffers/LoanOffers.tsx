import { selectOffer, showConfirmation } from '@store/loanApplicationSlice';
import { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import './LoanOffers.scss';
import LoanOfferCard, { LoanOfferData } from './LoanOfferCard/LoanOfferCard';

const LoanOffers: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedOffer, loanOffers } = useSelector((state: RootState) => state.loanApplication);

  const handleSelectOffer = async (offer: LoanOfferData) => {
    try {
      const response = await fetch('http://localhost:8080/application/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
      });

      if (!response.ok) {
        throw new Error('Failed to submit offer');
      }

      dispatch(selectOffer(offer));
      dispatch(showConfirmation());
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  return (
    <section>
      <div className="loan-offer-content">
        <div className="loan-offer-cards">
          {loanOffers.map((offerData, index) => (
            <LoanOfferCard key={index} {...offerData} onSelect={() => handleSelectOffer(offerData)} />
          ))}
        </div>
      </div>
      {selectedOffer && (
        <div>
          <h2>Selected Offer</h2>
          <p>Monthly Payment: {selectedOffer.monthlyPayment}</p>
        </div>
      )}
    </section>
  );
};

export default LoanOffers;
