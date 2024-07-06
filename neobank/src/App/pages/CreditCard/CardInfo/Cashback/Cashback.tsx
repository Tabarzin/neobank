import React from 'react';
import './Cashback.scss';

const Cashback: React.FC = () => {
  return (
    <section>
      <div className="cashback-grid">
        <div className="cashback-grid-item light">
          <p className="cashback-grid-item__text-s">For food delivery, cafes and restaurants</p>
          <p className="cashback-grid-item__text-l">5%</p>
        </div>
        <div className="cashback-grid-item dark">
          {' '}
          <p className="cashback-grid-item__text-s">In supermarkets with our subscription</p>
          <p className="cashback-grid-item__text-l">5%</p>
        </div>
        <div className="cashback-grid-item light">
          {' '}
          <p className="cashback-grid-item__text-s">In clothing stores and children's goods</p>
          <p className="cashback-grid-item__text-l">2%</p>
        </div>
        <div className="cashback-grid-item dark">
          {' '}
          <p className="cashback-grid-item__text-s">Other purchases and payment of services and fines</p>
          <p className="cashback-grid-item__text-l">1%</p>
        </div>
        <div className="cashback-grid-item light">
          {' '}
          <p className="cashback-grid-item__text-s">Shopping in online stores</p>
          <p className="cashback-grid-item__text-l">up to 3%</p>
        </div>
        <div className="cashback-grid-item dark">
          {' '}
          <p className="cashback-grid-item__text-s">Purchases from our partners</p>
          <p className="cashback-grid-item__text-l">30%</p>
        </div>
      </div>
    </section>
  );
};

export default Cashback;
