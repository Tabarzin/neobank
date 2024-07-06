import React from 'react';
import './AboutCard.scss';
import money from '@assets/icons/money.svg';
import bag from '@assets/icons/bag.svg';
import calendar from '@assets/icons/calendar.svg';
import card from '@assets/icons/card.svg';
import clock from '@assets/icons/clock.svg';

const AboutCard: React.FC = () => {
  return (
    <section className="about-card">
      <article className="about-card__card card1">
        <img src={money} alt="Money Icon" />
        <h3 className="about-card__card_text-l">Up to 50 000 </h3>
        <p className="about-card__card_text-s">Cash and transfers without commission and percent</p>
      </article>
      <article className="about-card__card card2">
        <img src={calendar} alt="Calendar Icon" />
        <h3 className="about-card__card_text-l">Up to 160 days</h3>
        <p className="about-card__card_text-s">Without percent on the loan</p>
      </article>
      <article className="about-card__card card3">
        <img src={clock} alt="Clock Icon" />
        <h3 className="about-card__card_text-l">Free delivery</h3>
        <p className="about-card__card_text-s">
          We will deliver your card by courier at a convenient place and time for you
        </p>
      </article>
      <article className="about-card__card card4">
        <img src={bag} alt="Bag Icon" />
        <h3 className="about-card__card_text-l">Up to 12 months</h3>
        <p className="about-card__card_text-s">
          No percent. For equipment, clothes and other purchases in installments
        </p>
      </article>
      <article className="about-card__card card5">
        <img src={card} alt="Credit card Icon" />
        <h3 className="about-card__card_text-l">Convenient deposit and withdrawal</h3>
        <p className="about-card__card_text-s">
          At any ATM. Top up your credit card for free with cash or transfer from other cards
        </p>
      </article>
    </section>
  );
};

export default AboutCard;
