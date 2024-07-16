import './NewsCard.scss';
import React from 'react';

interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  url: string;
}

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, description, url }) => {
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-card__img" />
      <span className="news-card__title">{title}</span>
      <span className="news-card__description"> {truncateDescription(description, 100)}</span>
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__link">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
