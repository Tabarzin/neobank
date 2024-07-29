import ConfirmationTemplate from '@components/ConfirmationTemplate/ConfirmationTemplate';
import Button from '@components/Button/Button';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal/Modal';
import './PaymentSchedule.scss';

interface TableData {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

type SortKey = keyof TableData;

const PaymentSchedule: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [data, setData] = useState<TableData[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showFinalDenyModal, setShowFinalDenyModal] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/admin/application/${applicationId}`);
        setData(response.data.credit.paymentSchedule);
        console.log(response.data.credit.paymentSchedule);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    if (applicationId) {
      fetchData();
    }
  }, [applicationId]);

  const sortData = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '▼';
    }
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const handleSend = async () => {
    try {
      await axios.post(`http://localhost:8080/document/${applicationId}`);
      setShowDocuments(true);
    } catch (err) {
      setError('Failed to send document');
    }
  };

  const handleDeny = () => {
    setShowDenyModal(true);
  };

  const handleFinalDeny = () => {
    setShowFinalDenyModal(true);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;

  if (showDocuments)
    return (
      <ConfirmationTemplate
        title={'Documents are formed'}
        message={'Documents for signing will be sent to your email'}
      />
    );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <Header />
      <div className="payment-content">
        <div className="payment-table">
          <div className="payment-table-text">
            <h3 className="payment-table-text-title">Payment Schedule</h3>
            <p className="payment-table-text-p">Step 3 of 5</p>
          </div>

          <div className="grid-table">
            <div className="grid-header">
              {Object.keys(data[0]).map((key) => (
                <div key={key} className="grid-cell header-cell" onClick={() => sortData(key as SortKey)}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  <span className="sort-icon">{getSortDirection(key as SortKey)}</span>
                </div>
              ))}
            </div>
            {data.map((row, index) => (
              <div key={index} className="grid-row">
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <div key={cellIndex} className="grid-cell">
                    <span className="cell-header">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:{' '}
                    </span>
                    {typeof value === 'number' && key !== 'number' ? value.toFixed(2) : value}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="payment-buttons">
            <Button onClick={handleDeny} className="deny">
              Deny
            </Button>
            <div className="send-block">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="checkbox"
                />
                I agree with the payment schedule
              </label>
              <Button onClick={handleSend} disabled={!isChecked} className="send-button">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={showDenyModal} onClose={() => setShowDenyModal(false)} title="Confirm Denial">
        <h5 className="deny-title">Deny application</h5>
        <p className="deny-text">You exactly sure, you want to cancel this application?</p>
        <div className="denial-buttons">
          <Button onClick={handleFinalDeny} className="deny">
            Deny
          </Button>
          <Button onClick={() => setShowDenyModal(false)}>Cancel</Button>
        </div>
      </Modal>

      <Modal isOpen={showFinalDenyModal} onClose={handleGoHome} title="Application Denied">
        <h5 className="deny-title">Deny application</h5>
        <p className="deny-text">Your application has been denied</p>
        <Button onClick={handleGoHome} className="go-home-button">
          Go home
        </Button>
      </Modal>
    </section>
  );
};

export default PaymentSchedule;
