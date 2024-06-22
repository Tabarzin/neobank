import Header from '@components/Header';
import ExchangeRates from './ExchangeRates';
import Features from './Features/Features';
import Hero from './Hero/Hero';
import Map from './Map/Map';
import './HomePage.scss';
import Subscribe from './Subscribe/Subscribe';
import Footer from '@components/Footer/Footer';
import News from './News/News';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <Features />
        <ExchangeRates />
        <Map />
        <News />
        <Subscribe />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
