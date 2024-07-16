import { useState } from 'react';
import './ApplyForm.scss';
import Form from './Form/Form';

const ApplyFrom: React.FC = () => {
  const [amount, setAmount] = useState(150000);
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
              <label htmlFor="range" className="apply-slider-input">
                Select amount
              </label>
              <input
                type="number"
                id="sum"
                name="sum"
                min="15000"
                max="600000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="apply-slider-input"
              />

              <div>
                <input
                  className="apply-slider-line"
                  id="range"
                  type="range"
                  min="15000"
                  max="600000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
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
            <p className="apply-slider-p">{amount.toLocaleString()} ₽</p>
            <div className="horizontal-line"></div>
          </div>
        </div>
        <Form />
      </div>
    </section>
  );
};

export default ApplyFrom;
