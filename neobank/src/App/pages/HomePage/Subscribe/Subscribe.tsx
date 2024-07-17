import './Subscribe.scss';
import send from '@assets/images/send.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(localStorage.getItem('isSubscribed') === 'true');

  useEffect(() => {
    if (localStorage.getItem('isSubscribed') === 'true') {
      setSubscribed(true);
    }
  }, []);

  interface SubscriptionResponse {
    data: {
      message: string;
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response: SubscriptionResponse;
      if (process.env.NODE_ENV === 'development') {
        response = await new Promise((resolve) =>
          setTimeout(() => resolve({ data: { message: 'Subscription successful' } }), 500),
        );
      } else {
        response = await axios.post('http://localhost:8080/email', { email });
      }

      if (response.data.message === 'Subscription successful') {
        setSubscribed(true);
        localStorage.setItem('isSubscribed', 'true');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Subscription failed', error);
    }
  };

  return (
    <section className="subscribe">
      <a href="#" className="subscribe__support">
        Support
      </a>
      <h3 className="subscribe__h3">Subscribe Newsletter & get Bank News</h3>
      <form onSubmit={handleSubmit} className="subscribe__form">
        {subscribed ? (
          <p className="subscribe__message">You are already subscribed to the bank's newsletter</p>
        ) : (
          <>
            <input
              type="email"
              id="email"
              name="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              className="subscribe__input"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe__button">
              <img src={send} alt="Send" />
              Subscribe
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default Subscribe;
