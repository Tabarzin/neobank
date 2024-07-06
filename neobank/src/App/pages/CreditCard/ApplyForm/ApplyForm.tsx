import './ApplyForm.scss';
import Form from './Form/Form';

const ApplyFrom: React.FC = () => {
  return (
    <section>
      <div className="apply-form-content">
        <div className="apply-slider-amount-block">
          <div className="apply-slider-block">
            <div className="apply-slider-text">
              <h3 className="apply-slider-title">Customize your card</h3>
              <p className="apply-slider-p"> Step 1 of 5</p>
            </div>
            <div className="apply-slider">
              <p className="apply-slider-p">Select amount</p>
              <p className="apply-slider-p">150 000</p>
              <div>
                <input className="apply-slider-line" type="range" min="15000" max="600000" value="150000"></input>
              </div>
              <div className="apply-slider-sums">
                <p>15 000</p>
                <p>600 000</p>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="amount-block">
            <h4 className="amount-block-h4">You have chosen the amount</h4>
            <p className="apply-slider-p">150 000 ₽</p>
            <div className="horizontal-line"></div>
          </div>
        </div>
        <Form />
      </div>
    </section>
  );
};

export default ApplyFrom;
