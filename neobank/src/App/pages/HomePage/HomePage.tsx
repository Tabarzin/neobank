import Header from '@components/Header';
import ExchangeRates from './ExchangeRates';
import Features from './Features/Features';
import Hero from './Hero/Hero';
import Map from './Map/Map';
import './HomePage.scss';
import Subscribe from './Subscribe/Subscribe';
import Footer from '@components/Footer/Footer';
import News from './News/News';
import { Suspense } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <Features />
        <ExchangeRates />
        <Map />
        <Suspense
          fallback={
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          }
        >
          <News />
        </Suspense>
        <Subscribe />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
