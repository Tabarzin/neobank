import React from 'react';
import './RatesConditions.scss';

const RatesConditions: React.FC = () => {
  return (
    <section>
      <div className="rates-conditions">
        <div className="rates-conditions-item left">Card currency</div>
        <div className="rates-conditions-item right">Rubles, dollars, euro</div>
        <div className="rates-conditions-item left">Interest free period</div>
        <div className="rates-conditions-item right">0% up to 160 days</div>
        <div className="rates-conditions-item left">Payment system</div>
        <div className="rates-conditions-item right">Mastercard, Visa</div>
        <div className="rates-conditions-item left">Maximum credit limit on the card</div>
        <div className="rates-conditions-item right">600 000 ₽ </div>
        <div className="rates-conditions-item left">Replenishment and withdrawal</div>
        <div className="rates-conditions-item right">
          At any ATM. Top up your credit card for free with cash or transfer from other cards
        </div>
        <div className="rates-conditions-item left">Max cashback per month </div>
        <div className="rates-conditions-item right">15 000 ₽ </div>
        <div className="rates-conditions-item left">Transaction Alert</div>
        <div className="rates-conditions-item right">
          60 ₽ — SMS or push notifications <br />0 ₽ — card statement, information about transactions in the online bank
        </div>
      </div>
    </section>
  );
};

export default RatesConditions;
