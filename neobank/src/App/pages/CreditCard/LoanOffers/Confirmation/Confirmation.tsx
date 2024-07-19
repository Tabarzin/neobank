import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import './Confirmation.scss';

const Confirmation: React.FC = () => {
  const selectedOffer = useSelector((state: RootState) => state.loanApplication.selectedOffer);

  if (!selectedOffer) {
    return <div>No offer selected</div>;
  }

  return (
    <section className="confirmation-content">
      <div className="confirmation">
        <h3 className="confirmation-h3">The preliminary decision has been sent to your email.</h3>
        <p className="confirmation-p">
          In the letter you can get acquainted with the preliminary decision on the credit card.
        </p>
      </div>
    </section>
  );
};

export default Confirmation;
