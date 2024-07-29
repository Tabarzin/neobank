import './FinalPage.scss';
import congrats_img from '@assets/images/loan-offer-img.svg';
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

import { resetState as resetLoanApplication } from '@store/loanApplicationSlice';
import { resetState as resetLoanApplicationContinuation } from '@store/loanApplicationContinuationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const FinalPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetLoanApplication());
    dispatch(resetLoanApplicationContinuation());

    navigate('/');
  };

  return (
    <section>
      <Header />
      <div className="final-page-content">
        <img src={congrats_img} alt="Surprize Image" />
        <div className="final-page">
          <h3 className="final-page-h3">Congratulations! You have completed your new credit card!</h3>
          <p className="final-page-p">Your credit card will arrive soon. Thank you for choosing us!</p>
          <Button onClick={handleClick}>View other offers of our bank</Button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FinalPage;
