import Header from '@components/Header';
import ExchangeRates from './ExchangeRates';
import Features from './Features/Features';
import Hero from './Hero/Hero';
import Map from './Map/Map';
import './HomePage.scss';
import Subscribe from './Subscribe/Subscribe';
import Footer from '@components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <ExchangeRates />
        <Map />
        <Subscribe />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
