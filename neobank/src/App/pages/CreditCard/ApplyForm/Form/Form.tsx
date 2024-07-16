import Button from '@components/Button/Button';
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import './Form.scss';

interface FormInputs {
  lastname: string;
  firstname: string;
  patronimic: string;
  email: string;
  birth: string;
  passport_series: string;
  passport_num: string;
  select1: string;
}

const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate('/application');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#credit-card-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const trimWhitespace = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.trim();
  };

  return (
    <div ref={formRef} id="credit-card-form" role="form" aria-label="Contact information">
      <h4 className="form-h4">Contact information</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="grid-item">
            <p className="form-p">
              Your last name <span className="redstar">*</span>
            </p>
            <input
              type="text"
              className={`form-input ${errors.lastname ? 'error' : ''} ${dirtyFields.lastname && !errors.lastname ? 'success' : ''}`}
              {...register('lastname', { required: 'Enter your last name' })}
              placeholder="For example Doe"
              onBlur={trimWhitespace}
            />
            {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your first name <span className="redstar">*</span>
            </p>
            <input
              type="text"
              className={`form-input ${errors.firstname ? 'error' : ''} ${dirtyFields.firstname && !errors.firstname ? 'success' : ''}`}
              {...register('firstname', { required: 'Enter your first name' })}
              placeholder="For example John"
              onBlur={trimWhitespace}
            />
            {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">Your patronymic </p>
            <input
              type="text"
              className="form-input"
              {...register('patronimic')}
              placeholder="For example Viktorovich"
            />
          </div>
          <div className="grid-item">
            <p className="form-p">
              Select term <span className="redstar">*</span>
            </p>
            <select className="form-input" {...register('select1')}>
              <option value="">Select a term</option>
              <option value="6m">6 months</option>
              <option value="12m">12 months</option>
              <option value="18m">18 months</option>
              <option value="24m">24 months</option>
            </select>
            {errors.select1 && <p className="error-message">{errors.select1.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your email <span className="redstar">*</span>
            </p>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''} ${dirtyFields.email && !errors.email ? 'success' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              placeholder="test@gmail.com"
              onBlur={trimWhitespace}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your date of birth <span className="redstar">*</span>
            </p>
            <input
              className={`form-input ${errors.birth ? 'error' : ''} ${dirtyFields.birth && !errors.birth ? 'success' : ''}`}
              type="date"
              {...register('birth', {
                required: 'Date of birth is required',
                validate: (value) => {
                  const birthDate = new Date(value);
                  const today = new Date();
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const monthDiff = today.getMonth() - birthDate.getMonth();

                  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                  }

                  return age >= 18 || 'You must be at least 18 years old';
                },
              })}
            />
            {errors.birth && <p className="error-message">{errors.birth.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your passport series <span className="redstar">*</span>
            </p>
            <input
              className={`form-input ${errors.passport_series ? 'error' : ''} ${dirtyFields.passport_series && !errors.passport_series ? 'success' : ''}`}
              {...register('passport_series', {
                required: 'Passport series must be 4 digits',
                pattern: {
                  value: /^\d{4}$/,
                  message: 'Passport series must be 4 digits',
                },
              })}
              placeholder="0000"
              onBlur={trimWhitespace}
            />
            {errors.passport_series && <p className="error-message">{errors.passport_series.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your passport number <span className="redstar">*</span>{' '}
            </p>
            <input
              className={`form-input ${errors.passport_num ? 'error' : ''} ${dirtyFields.passport_num && !errors.passport_num ? 'success' : ''}`}
              {...register('passport_num', {
                required: 'Passport number must be 6 digits',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Passport number must be 6 digits',
                },
              })}
              placeholder="000000"
              onBlur={trimWhitespace}
            />
            {errors.passport_num && <p className="error-message">{errors.passport_num.message}</p>}
          </div>
        </div>
        <Button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <RotatingLines
                visible={true}
                height="20"
                width="20"
                color="black"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}
                wrapperClass=""
              />
              Loading...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Form;
