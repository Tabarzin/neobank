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
        <h3 className="about-card__card_text-l">Карточка 1</h3>
        <p className="about-card__card_text-s">Содержимое карточки 1</p>
      </article>
      <article className="about-card__card card2">
        <img src={calendar} alt="Calendar Icon" />
        <h3 className="about-card__card_text-l">Карточка 1</h3>
        <p className="about-card__card_text-s">Содержимое карточки 1</p>
      </article>
      <article className="about-card__card card3">
        <img src={clock} alt="Clock Icon" />
        <h3 className="about-card__card_text-l">Карточка 1</h3>
        <p className="about-card__card_text-s">Содержимое карточки 1</p>
      </article>
      <article className="about-card__card card4">
        <img src={bag} alt="Bag Icon" />
        <h3 className="about-card__card_text-l">Карточка 1</h3>
        <p className="about-card__card_text-s">Содержимое карточки 1</p>
      </article>
      <article className="about-card__card card5">
        <img src={card} alt="Credit card Icon" />
        <h3 className="about-card__card_text-l">Карточка 1</h3>
        <p className="about-card__card_text-s">Содержимое карточки 1</p>
      </article>
    </section>
  );
};

export default AboutCard;
