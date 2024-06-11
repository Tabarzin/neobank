import './Subscribe.scss';
import email from '@assets/images/email.svg';
import send from '@assets/images/send.svg';

const Subscribe = () => {
  return (
    <section className="subscribe">
      <a href="#" className="subscribe__support">
        Support
      </a>
      <h3 className="subscribe__h3">Subscribe Newsletter & get Bank News</h3>
      <form action="" method="post" className="subscribe__form">
        <input
          type="email"
          id="email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="subscribe__input"
          placeholder="Your email"
        />

        <button type="submit" className="subscribe__button">
          <img src={send} alt="Send" />
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
