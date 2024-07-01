import './News.scss';
import NewsCard from './NewsCard/NewsCard';
import { useNews } from '@customHooks/useNews';
import { RotatingLines } from 'react-loader-spinner';
import { useEffect, useRef, useState } from 'react';

const News: React.FC = () => {
  const { news, status, error, fetchNews } = useNews();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredNews = news.filter(
    (article) =>
      article.urlToImage && article.title && article.description && !article.description.includes('<') && article.url,
  );

  const isBeginning = currentIndex === 0;
  const isEnd = currentIndex + slidesPerView >= filteredNews.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - slidesPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(filteredNews.length - slidesPerView, prevIndex + slidesPerView));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / slidesPerView;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }, [currentIndex, slidesPerView]);

  return (
    <section className="news">
      <div>
        <h3 className="news__h3">Current news from the world of finance</h3>
        <span className="news__subtitle">
          We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.
        </span>
      </div>
      {status === 'loading' && (
        <div>
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
        </div>
      )}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <div className="slider">
          <div className="slider-container" ref={sliderRef}>
            {filteredNews.map((article, index) => (
              <div key={index} className="slider-item">
                <NewsCard
                  imageUrl={article.urlToImage}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                />
              </div>
            ))}
          </div>
          <div className="slider-buttons">
            <button className="slider-buttons_button" onClick={handlePrev} disabled={isBeginning}>
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25"
                  stroke={isBeginning ? 'black' : 'white'}
                />
              </svg>
            </button>
            <button className="slider-buttons_button" onClick={handleNext} disabled={isEnd}>
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 9H15.1579V1.60858C15.1579 1.41552 15.4044 1.33452 15.5189 1.48994L24 13L15.5189 24.5101C15.4044 24.6655 15.1579 24.5845 15.1579 24.3914V17H0"
                  stroke={isEnd ? 'black' : 'white'}
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
