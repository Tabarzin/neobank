import CreditCardNavMenu from '../CreditCardNavMenu/CreditCardNavMenu';
import './CardInfo.scss';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const CardInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/card') {
      navigate('/credit-card/about', { replace: true });
    }
  }, [location, navigate]);

  return (
    <section>
      <div className="cardinfo-content">
        <CreditCardNavMenu />
        <Outlet />
      </div>
    </section>
  );
};

export default CardInfo;
