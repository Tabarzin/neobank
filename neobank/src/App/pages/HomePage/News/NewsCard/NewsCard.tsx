import './NewsCard.scss';
import React from 'react';

interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, description, url }) => {
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-card__img" />
      <span className="news-card__title">{title}</span>
      <span className="news-card__description">{description}</span>
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__link">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
