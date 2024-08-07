import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import './SignPage.scss';
import infofile from '@assets/files/credit-card-offer.pdf';
import fileicon from '@assets/icons/file_icon.svg';
import Button from '@components/Button/Button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ConfirmationTemplate from '@components/ConfirmationTemplate/ConfirmationTemplate';

const SignPage: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignSuccess, setShowSignSuccess] = useState(false);

  const handleSend = async () => {
    if (!isChecked) return;

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:8080/document/${applicationId}/sign`);
      setShowSignSuccess(true);
    } catch (err) {
      setError('Failed to sign the document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSignSuccess) {
    return (
      <ConfirmationTemplate
        title="Documents have been successfully signed and sent for approval"
        message="Within 10 minutes you will be sent a PIN code to your email for confirmation"
      />
    );
  }

  return (
    <section>
      <Header />
      <div className="sign-content">
        <div className="sign-text">
          <h3 className="sign-text-title">Signing of documents</h3>
          <p className="sign-text-p">Step 4 of 5</p>
        </div>
        <p className="sign-info">
          Information on interest rates under bank deposit agreements with individuals. Center for Corporate Information
          Disclosure. Information of a professional participant in the securities market. Information about persons
          under whose control or significant influence the Partner Banks are. By leaving an application, you agree to
          the processing of personal data, obtaining information, obtaining access to a credit history, using an
          analogue of a handwritten signature, an offer, a policy regarding the processing of personal data, a form of
          consent to the processing of personal data.
        </p>
        <div className="download">
          <a href={infofile} download>
            <img src={fileicon} alt="Download PDF" />
          </a>
          <p className="download-text">Information on your card</p>
        </div>

        <div className="send-block">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="checkbox"
            />
            I agree
          </label>
          <Button onClick={handleSend} disabled={!isChecked || isLoading} className="send-button">
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <Footer />
    </section>
  );
};

export default SignPage;
