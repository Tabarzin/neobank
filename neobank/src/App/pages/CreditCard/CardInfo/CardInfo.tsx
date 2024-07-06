import CreditCardNavMenu from '../CreditCardNavMenu/CreditCardNavMenu';
import './CardInfo.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

const CardInfo: React.FC = () => {
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
