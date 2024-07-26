import ConfirmationTemplate from '@/components/ConfirmationTemplate/ConfirmationTemplate';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FinalPage from '../../FinalPage/FinalPage';
import './Code.scss';

const DigitInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}> = ({ value, onChange, onKeyDown, autoFocus }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div style={{ width: 48, height: 48, position: 'relative', margin: '0 5px' }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.25" y="0.25" width="47.5" height="47.5" rx="7.75" stroke="#808080" strokeWidth="0.5" />
        {!value && <circle cx="24" cy="24" r="9.25" stroke="#808080" strokeWidth="1.5" />}
        {value && (
          <text x="24" y="30" textAnchor="middle" fontSize="24" fill="#808080">
            {value}
          </text>
        )}
      </svg>
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.match(/^[0-9]$/)) {
            onChange(newValue);
          }
        }}
        onKeyDown={onKeyDown}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          textAlign: 'center',
          fontSize: '24px',
          color: 'transparent',
          caretColor: 'transparent',
        }}
      />
    </div>
  );
};

const Code: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(null);
    if (index < 3 && value !== '') {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      console.log(code.join(''), 'CODE');
      submitCode();
    }
  }, [code]);

  const submitCode = async () => {
    try {
      const numericCode = Number(code.join(''));
      console.log(`Submitting code: ${numericCode}`);

      const response = await axios.post(`http://localhost:8080/document/${applicationId}/sign/code`, numericCode, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('success');
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
          <div className="inputs">
            {code.map((digit, index) => (
              <DigitInput
                key={index}
                value={digit}
                onChange={(value) => handleChange(index, value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          {error && <div className="invalid-code">{error}</div>}
        </div>
      </ConfirmationTemplate>
    </section>
  );
};

export default Code;
