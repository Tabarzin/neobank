import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import './Confirmation.scss';

const Confirmation: React.FC = () => {
  const selectedOffer = useSelector((state: RootState) => state.loanApplication.selectedOffer);

  if (!selectedOffer) {
    return <div>No offer selected</div>;
  }

  return (
    <div>
      <h2>Application Confirmed</h2>
      <p>Thank you for your application. Here are the details of your selected offer:</p>
      <ul>
        <li>Requested Amount: {selectedOffer.requestedAmount}</li>
        <li>Total Amount: {selectedOffer.totalAmount}</li>
        <li>Term: {selectedOffer.term} months</li>
        <li>Monthly Payment: {selectedOffer.monthlyPayment}</li>
        <li>Interest Rate: {selectedOffer.rate}%</li>
        <li>Insurance Included: {selectedOffer.isInsuranceIncluded ? 'Yes' : 'No'}</li>
        <li>Salary Client: {selectedOffer.isSalaryClient ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
};

export default Confirmation;
