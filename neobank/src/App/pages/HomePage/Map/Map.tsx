import './Map.scss';
import map from '@assets/images/map.svg';

const Map = () => {
  return (
    <section className="map">
      <h3 className="map__h3">You can use our services anywhere in the world</h3>
      <span className="map__subtitle">Withdraw and transfer money online through our application</span>
      <img src={map} alt="Map" />
    </section>
  );
};

export default Map;
