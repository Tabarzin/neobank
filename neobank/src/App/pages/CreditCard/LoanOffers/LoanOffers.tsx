import { selectOffer, showConfirmation } from '@store/loanApplicationSlice';
import { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import './LoanOffers.scss';
import LoanOfferCard, { LoanOfferData, LoanOfferProps } from './LoanOfferCard/LoanOfferCard';

const offerDataList: LoanOfferData[] = [
  {
    applicationId: 1,
    requestedAmount: 200000,
    totalAmount: 200000,
    term: 24,
    monthlyPayment: 9697,
    rate: 15,
    isInsuranceIncluded: false,
    isSalaryClient: false,
  },
  {
    applicationId: 2,
    requestedAmount: 200000,
    totalAmount: 200000,
    term: 24,
    monthlyPayment: 9788,
    rate: 11,
    isInsuranceIncluded: true,
    isSalaryClient: false,
  },
  {
    applicationId: 3,
    requestedAmount: 200000,
    totalAmount: 200000,
    term: 24,
    monthlyPayment: 9603,
    rate: 14,
    isInsuranceIncluded: false,
    isSalaryClient: true,
  },
  {
    applicationId: 4,
    requestedAmount: 200000,
    totalAmount: 200000,
    term: 24,
    monthlyPayment: 9690,
    rate: 10,
    isInsuranceIncluded: true,
    isSalaryClient: true,
  },
];

// const LoanOffers: React.FC = () => {
//   const dispatch = useDispatch();
//   const { selectedOffer } = useSelector((state: RootState) => state.loanApplication);

//   const handleSelectOffer = async (offer: LoanOfferData) => {
//     try {
//       const response = await fetch('http://localhost:8080/application/apply', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(offer),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit offer');
//       }

//       dispatch(selectOffer(offer));
//       dispatch(showConfirmation());
//     } catch (error) {
//       console.error('Error submitting offer:', error);
//     }
//   };

//   // const handleSelectOffer = (offer: LoanOfferProps) => {
//   //   dispatch(selectOffer(offer));
//   // };
//   return (
//     <section>
//       <div className="loan-offer-content">
//         <div className="loan-offer-cards">
//           <LoanOfferCard
//             requestedAmount={200000}
//             totalAmount={200000}
//             months={24}
//             monthlyPayment={9697}
//             rate={15}
//             isInsuranceIncluded={false}
//             isSalaryClient={false}
//             onSelect={() =>
//               handleSelectOffer({
//                 requestedAmount: 200000,
//                 totalAmount: 200000,
//                 months: 24,
//                 monthlyPayment: 9697,
//                 rate: 15,
//                 isInsuranceIncluded: false,
//                 isSalaryClient: false,
//                 onSelect: function (offer: LoanOfferData): void {
//                   throw new Error('Function not implemented.');
//                 },
//               })
//             }
//           />

//           <LoanOfferCard
//             requestedAmount={200000}
//             totalAmount={200000}
//             months={24}
//             monthlyPayment={9788}
//             rate={11}
//             isInsuranceIncluded={true}
//             isSalaryClient={false}
//             onSelect={() =>
//               handleSelectOffer({
//                 requestedAmount: 200000,
//                 totalAmount: 200000,
//                 months: 24,
//                 monthlyPayment: 9788,
//                 rate: 11,
//                 isInsuranceIncluded: true,
//                 isSalaryClient: false,
//               })
//             }
//           />
//           <LoanOfferCard
//             requestedAmount={200000}
//             totalAmount={200000}
//             months={24}
//             monthlyPayment={9603}
//             rate={14}
//             isInsuranceIncluded={false}
//             isSalaryClient={true}
//             onSelect={() =>
//               handleSelectOffer({
//                 requestedAmount: 200000,
//                 totalAmount: 200000,
//                 months: 24,
//                 monthlyPayment: 9603,
//                 rate: 14,
//                 isInsuranceIncluded: false,
//                 isSalaryClient: true,
//               })
//             }
//           />
//           <LoanOfferCard
//             requestedAmount={200000}
//             totalAmount={200000}
//             months={24}
//             monthlyPayment={9690}
//             rate={10}
//             isInsuranceIncluded={true}
//             isSalaryClient={true}
//             onSelect={() =>
//               handleSelectOffer({
//                 requestedAmount: 200000,
//                 totalAmount: 200000,
//                 months: 24,
//                 monthlyPayment: 9690,
//                 rate: 10,
//                 isInsuranceIncluded: true,
//                 isSalaryClient: true,
//               })
//             }
//           />
//         </div>
//       </div>
//       {selectedOffer && (
//         <div>
//           <h2>Selected Offer</h2>
//           <p>Monthly Payment: {selectedOffer.monthlyPayment}</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default LoanOffers;

const LoanOffers: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedOffer } = useSelector((state: RootState) => state.loanApplication);

  const handleSelectOffer = async (offer: LoanOfferProps) => {
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
          {offerDataList.map((offerData, index) => (
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