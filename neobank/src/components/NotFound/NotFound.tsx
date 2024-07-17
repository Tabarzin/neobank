import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';
import './NotFound.scss';
import oops_image from '@assets/images/404_image.svg';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section>
      <Header />
      <div className="notfound-content">
        <div className="notfound-block">
          <div className="notfound-block_text">
            <h3 className="notfound-h3">Oops</h3>
            <p className="notfound-sub">Page not found</p>
            <p className="notfound-p">This Page doesn`t exist or was removed! We suggest you go back.</p>
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </div>
          <div>
            <img src={oops_image} alt="Not Found Image" className="notfound-block_image" />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default NotFound;
