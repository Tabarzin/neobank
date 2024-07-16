import './GetCard.scss';

const GetCard: React.FC = () => {
  return (
    <section>
      <div className="get-card-content">
        <h3 className="get-card-title">How to get a card</h3>
        <div className="get-card-blocks">
          <div className="get-card-block">
            <div className="get-card_circle-line">
              <div className="get-card-wrapper">
                <div className="get-card-circle">1</div>
                <div className="horizontal-line"></div>
              </div>
            </div>
            <p className="get-card_p">Fill out an online application - you do not need to visit the bank</p>
          </div>
          <div className="get-card-block">
            <div className="get-card_circle-line">
              <div className="get-card-wrapper">
                <div className="get-card-circle">2</div>
                <div className="horizontal-line"></div>
              </div>
            </div>
            <p className="get-card_p">Find out the bank's decision immediately after filling out the application</p>
          </div>
          <div className="get-card-block">
            <div className="get-card_circle-line">
              <div className="get-card-wrapper">
                <div className="get-card-circle">3</div>
                <div className="horizontal-line"></div>
              </div>
            </div>
            <p className="get-card_p">
              The bank will deliver the card free of charge, wherever convenient, to your city
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetCard;
