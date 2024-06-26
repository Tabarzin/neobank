import './Features.scss';
import features_image from '@assets/images/features_image.svg';
import check_circle from '@assets/images/check-circle.svg';

const Features = () => {
  return (
    <section className="features">
      <div className="features-content">
        <img src={features_image} alt="Features Image" className="features-content__image" />

        <div className="features-content__text">
          <h2 className="features-content__text_h2">We Provide Many Features You Can Use</h2>
          <p className="features-content__text_subtitle">
            You can explore the features that we provide with fun and have their own functions each feature
          </p>
          <ul className="features-content__list">
            <li className="features-content__list_item">Powerfull online protection.</li>
            <li className="features-content__list_item">Cashback without borders</li>
            <li className="features-content__list_item">Personal design</li>
            <li className="features-content__list_item">Work anywhere in the world</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
