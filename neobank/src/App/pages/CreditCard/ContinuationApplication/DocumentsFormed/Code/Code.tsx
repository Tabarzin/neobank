import ConfirmationTemplate from '@components/ConfirmationTemplate/ConfirmationTemplate';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Code.scss';

import { PinInput } from 'react-input-pin-code';

const Code: React.FC = () => {
  const [values, setValues] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();

  useEffect(() => {
    if (values.every((digit) => digit !== '')) {
      submitCode();
    }
  }, [values]);

  const submitCode = async () => {
    try {
      const numericCode = Number(values.join(''));

      const response = await axios.post(`http://localhost:8080/document/${applicationId}/sign/code`, numericCode, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/success');
      } else {
        console.log('error');
        setError('Invalid confirmation code');
      }
    } catch (error) {
      setError('Invalid confirmation code');
    }
  };

  return (
    <section>
      <ConfirmationTemplate title={'Please enter confirmation code'} message={''}>
        <div className="inputs-block">
          <div style={{ padding: '10px' }}>
            <PinInput
              values={values}
              onChange={(values) => {
                setValues(values as string[]);
                setError(null);
              }}
              type="number"
              inputMode="numeric"
              inputStyle={{ borderColor: error ? '#FF0000' : '#808080' }}
              autoFocus={true}
              autoTab={true}
              mask={false}
              validate={/^[0-9]$/}
            />
          </div>
          {error && <div className="invalid-code">{error}</div>}
        </div>
      </ConfirmationTemplate>
    </section>
  );
};

export default Code;
