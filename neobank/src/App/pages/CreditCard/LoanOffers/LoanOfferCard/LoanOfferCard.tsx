import './LoanOfferCard.scss';
import loan_offer_img from '@assets/images/loan-offer-img.svg';
import Button from '@components/Button/Button';

export type LoanOfferData = {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceIncluded: boolean;
  isSalaryClient: boolean;
};

export interface LoanOfferProps extends LoanOfferData {
  onSelect: (offer: LoanOfferData) => void;
}

const LoanOfferCard: React.FC<LoanOfferProps> = ({
  applicationId,
  requestedAmount,
  totalAmount,
  term,
  monthlyPayment,
  rate,
  isInsuranceIncluded,
  isSalaryClient,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect({
      applicationId,
      requestedAmount,
      totalAmount,
      term,
      monthlyPayment,
      rate,
      isInsuranceIncluded,
      isSalaryClient,
    });
  };
  return (
    <div className="loan-offer-card" onClick={handleClick}>
      <img src={loan_offer_img} alt="Loan Offer Image" className="loan-img" />
      <div className="card-text">
        <p className="loan-offer-p">Requested amount: {requestedAmount.toLocaleString()} ₽</p>
        <p className="loan-offer-p">Total amount: {totalAmount.toLocaleString()} ₽</p>
        <p className="loan-offer-p">For {term} months</p>
        <p className="loan-offer-p">Monthly payment: {monthlyPayment.toLocaleString()} ₽</p>
        <p className="loan-offer-p">Your rate: {rate}%</p>
        <p className="loan-offer-p">
          Insurance included: <span className={isInsuranceIncluded ? 'icon yes' : 'icon not'}></span>
        </p>
        <p className="loan-offer-p">
          Salary client: <span className={isSalaryClient ? 'icon yes' : 'icon not'}></span>
        </p>
      </div>
      <Button>Select</Button>
    </div>
  );
};

export default LoanOfferCard;
