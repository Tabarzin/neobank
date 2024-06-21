import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      NeoBank
    </Link>
  );
};

export default Logo;
