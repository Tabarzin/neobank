import Button from '@components/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div role="form" aria-label="Contact information">
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
            />
            {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">
              Your first name <span className="redstar">*</span>
            </p>
            <input
              className={`form-input ${errors.firstname ? 'error' : ''} ${dirtyFields.firstname && !errors.firstname ? 'success' : ''}`}
              {...register('firstname', { required: 'Enter your first name' })}
              placeholder="For example John"
            />
            {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
          </div>
          <div className="grid-item">
            <p className="form-p">Your patronymic </p>
            <input className="form-input" {...register('patronimic')} placeholder="For example Viktorovich" />
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
              className={`form-input ${errors.email ? 'error' : ''} ${dirtyFields.email && !errors.email ? 'success' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              placeholder="test@gmail.com"
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
              {...register('birth', { required: 'Incorrect date of birth' })}
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
            />
            {errors.passport_num && <p className="error-message">{errors.passport_num.message}</p>}
          </div>
        </div>
        <Button type="submit" className="form-button">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Form;
