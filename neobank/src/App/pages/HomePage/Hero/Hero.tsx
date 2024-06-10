import Button from '@components/Button/Button';
import './Hero.scss';
import cardImage1 from '@assets/images/cardImage1.svg';
import cardImage2 from '@assets/images/cardImage2.svg';

import cardImage3 from '@assets/images/cardImage3.svg';

import cardImage4 from '@assets/images/cardImage4.svg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__textblock">
        <h1 className="hero__h1">Choose the design you like and apply for card right now</h1>
        <Button>Choose the card</Button>
      </div>
      <div className="hero__cardsblock">
        <img src={cardImage1} alt="Banking Card" />
        <img src={cardImage2} alt="Banking Card" />
        <img src={cardImage3} alt="Banking Card" />
        <img src={cardImage4} alt="Banking Card" />
      </div>
    </section>
  );
};

export default Hero;
