import { useParams } from 'react-router-dom';
import './ContinuationApplication.scss';

const ContinuationApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>continue</div>;
};

export default ContinuationApplication;
