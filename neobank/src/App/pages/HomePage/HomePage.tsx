import Header from '@components/Header';
import ExchangeRates from './ExchangeRates';
import Features from './Features/Features';
import Hero from './Hero/Hero';
import Map from './Map/Map';
import './HomePage.scss';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <ExchangeRates />
        <Map />
      </main>
    </>
  );
};

export default HomePage;
