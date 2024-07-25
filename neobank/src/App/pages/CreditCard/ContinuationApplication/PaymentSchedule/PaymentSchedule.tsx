import Footer from '@components/Footer/Footer';
import Header from '@components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

interface Props {
  applicationId: string;
}

const PaymentSchedule: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [data, setData] = useState<TableData[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/admin/application/1`);
        setData(response.data);
        console.log(response.data);
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
                  {key.toUpperCase().replace('_', ' ')}
                  <span className="sort-icon">{getSortDirection(key as SortKey)}</span>
                </div>
              ))}
            </div>
            {data.map((row, index) => (
              <div key={index} className="grid-row">
                {Object.values(row).map((value, cellIndex) => (
                  <div key={cellIndex} className="grid-cell">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PaymentSchedule;
