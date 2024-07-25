// import { RootState } from '@store/store';
// import Button from '@components/Button/Button';
// import { useRef, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { RotatingLines } from 'react-loader-spinner';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './ApplyForm.scss';
// import { showLoanOffers, updateFormData } from '@store/loanApplicationSlice';

// export interface FormInputs {
//   lastname: string;
//   firstname: string;
//   patronimic: string;
//   email: string;
//   birth: string;
//   passport_series: string;
//   passport_num: string;
//   select1: string;
// }

// const ApplyForm: React.FC = () => {
//   const dispatch = useDispatch();
//   const { formData, isFormValid } = useSelector((state: RootState) => state.loanApplication);
//   const [amount, setAmount] = useState(150000);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const formRef = useRef<HTMLDivElement | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, dirtyFields },
//   } = useForm<FormInputs>({
//     mode: 'onChange',
//   });

//   useEffect(() => {
//     if (location.hash === '#credit-card-form' && formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [location]);

//   const onSubmit = async (data: FormInputs) => {
//     setIsLoading(true);
//     try {
//       const formData = {
//         amount: amount,
//         term: parseInt(data.select1),
//         firstName: data.firstname,
//         lastName: data.lastname,
//         middleName: data.patronimic || null,
//         email: data.email,
//         birthdate: data.birth,
//         passportSeries: data.passport_series,
//         passportNumber: data.passport_num,
//       };

//       const response = await fetch('http://localhost:8080/application', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       console.log(response, 'RESPONSE APPLY FORM');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       dispatch(showLoanOffers());

//       //navigate('/application');  // отключил временно, чтобы не было перехода на несуществующую страницу
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const trimWhitespace = (event: React.FocusEvent<HTMLInputElement>) => {
//     event.target.value = event.target.value.trim();
//   };

//   return (
//     <section>
//       <div className="apply-form-content">
//         <div className="apply-slider-amount-block">
//           <div className="apply-slider-block" id="credit-card-form">
//             <div className="apply-slider-text">
//               <h3 className="apply-slider-title">Customize your card</h3>
//               <p className="apply-slider-p"> Step 1 of 5</p>
//             </div>
//             <div className="apply-slider">
//               <label htmlFor="range" className="apply-slider-input">
//                 Select amount
//               </label>
//               <input
//                 type="number"
//                 id="sum"
//                 name="sum"
//                 min="15000"
//                 max="600000"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 className="apply-slider-input"
//               />

//               <div>
//                 <input
//                   className="apply-slider-line"
//                   id="range"
//                   type="range"
//                   min="15000"
//                   max="600000"
//                   value={amount}
//                   onChange={(e) => setAmount(Number(e.target.value))}
//                 />
//               </div>
//               <div className="apply-slider-sums">
//                 <p>15 000</p>
//                 <p>600 000</p>
//               </div>
//             </div>
//           </div>
//           <div className="divider"></div>
//           <div className="amount-block">
//             <h4 className="amount-block-h4">You have chosen the amount</h4>
//             <p className="apply-slider-p">{amount.toLocaleString()} ₽</p>
//             <div className="horizontal-line"></div>
//           </div>
//         </div>

//         <div ref={formRef} role="form" aria-label="Contact information" className="credit-card-form">
//           <h4 className="form-h4">Contact information</h4>
//           <form className="form" onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-grid">
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your last name <span className="redstar">*</span>
//                 </p>
//                 <input
//                   type="text"
//                   className={`form-input ${errors.lastname ? 'error' : ''} ${dirtyFields.lastname && !errors.lastname ? 'success' : ''}`}
//                   {...register('lastname', { required: 'Enter your last name' })}
//                   placeholder="For example Doe"
//                   onBlur={trimWhitespace}
//                 />
//                 {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your first name <span className="redstar">*</span>
//                 </p>
//                 <input
//                   type="text"
//                   className={`form-input ${errors.firstname ? 'error' : ''} ${dirtyFields.firstname && !errors.firstname ? 'success' : ''}`}
//                   {...register('firstname', { required: 'Enter your first name' })}
//                   placeholder="For example John"
//                   onBlur={trimWhitespace}
//                 />
//                 {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">Your patronymic </p>
//                 <input
//                   type="text"
//                   className="form-input"
//                   {...register('patronimic')}
//                   placeholder="For example Viktorovich"
//                 />
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Select term <span className="redstar">*</span>
//                 </p>
//                 <select className="form-input" {...register('select1')}>
//                   <option value="">Select a term</option>
//                   <option value="6">6 months</option>
//                   <option value="12">12 months</option>
//                   <option value="18">18 months</option>
//                   <option value="24">24 months</option>
//                 </select>
//                 {errors.select1 && <p className="error-message">{errors.select1.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your email <span className="redstar">*</span>
//                 </p>
//                 <input
//                   type="email"
//                   className={`form-input ${errors.email ? 'error' : ''} ${dirtyFields.email && !errors.email ? 'success' : ''}`}
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /\S+@\S+\.\S+/,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                   placeholder="test@gmail.com"
//                   onBlur={trimWhitespace}
//                 />
//                 {errors.email && <p className="error-message">{errors.email.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your date of birth <span className="redstar">*</span>
//                 </p>
//                 <input
//                   className={`form-input ${errors.birth ? 'error' : ''} ${dirtyFields.birth && !errors.birth ? 'success' : ''}`}
//                   type="date"
//                   {...register('birth', {
//                     required: 'Date of birth is required',
//                     validate: (value) => {
//                       const birthDate = new Date(value);
//                       const today = new Date();
//                       let age = today.getFullYear() - birthDate.getFullYear();
//                       const monthDiff = today.getMonth() - birthDate.getMonth();

//                       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//                         age--;
//                       }

//                       return age >= 18 || 'You must be at least 18 years old';
//                     },
//                   })}
//                 />
//                 {errors.birth && <p className="error-message">{errors.birth.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your passport series <span className="redstar">*</span>
//                 </p>
//                 <input
//                   className={`form-input ${errors.passport_series ? 'error' : ''} ${dirtyFields.passport_series && !errors.passport_series ? 'success' : ''}`}
//                   {...register('passport_series', {
//                     required: 'Passport series must be 4 digits',
//                     pattern: {
//                       value: /^\d{4}$/,
//                       message: 'Passport series must be 4 digits',
//                     },
//                   })}
//                   placeholder="0000"
//                   onBlur={trimWhitespace}
//                 />
//                 {errors.passport_series && <p className="error-message">{errors.passport_series.message}</p>}
//               </div>
//               <div className="grid-item">
//                 <p className="form-p">
//                   Your passport number <span className="redstar">*</span>{' '}
//                 </p>
//                 <input
//                   className={`form-input ${errors.passport_num ? 'error' : ''} ${dirtyFields.passport_num && !errors.passport_num ? 'success' : ''}`}
//                   {...register('passport_num', {
//                     required: 'Passport number must be 6 digits',
//                     pattern: {
//                       value: /^\d{6}$/,
//                       message: 'Passport number must be 6 digits',
//                     },
//                   })}
//                   placeholder="000000"
//                   onBlur={trimWhitespace}
//                 />
//                 {errors.passport_num && <p className="error-message">{errors.passport_num.message}</p>}
//               </div>
//             </div>
//             <Button type="submit" className="form-button" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <RotatingLines
//                     visible={true}
//                     height="20"
//                     width="20"
//                     color="black"
//                     strokeWidth="5"
//                     animationDuration="0.75"
//                     ariaLabel="rotating-lines-loading"
//                     wrapperStyle={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}
//                     wrapperClass=""
//                   />
//                   Loading...
//                 </>
//               ) : (
//                 'Continue'
//               )}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ApplyForm;

import { RootState } from '@store/store';
import Button from '@components/Button/Button';
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './ApplyForm.scss';
import {
  showLoanOffers,
  updateFormData,
  setFormValidity,
  resetState,
  setLoanOffers,
} from '@store/loanApplicationSlice';

export interface FormInputs {
  lastname: string;
  firstname: string;
  patronimic: string;
  email: string;
  birth: string;
  passport_series: string;
  passport_num: string;
  select1: string;
}

const ApplyForm: React.FC = () => {
  const dispatch = useDispatch();
  const { formData, isFormValid } = useSelector((state: RootState) => state.loanApplication);
  const [amount, setAmount] = useState(150000);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: formData,
  });

  useEffect(() => {
    if (location.hash === '#credit-card-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    const isValid = Object.keys(errors).length === 0;
    dispatch(setFormValidity(isValid));
  }, [errors, dispatch]);

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      dispatch(updateFormData(data));
      const submissionData = {
        amount: amount,
        term: parseInt(data.select1),
        firstName: data.firstname,
        lastName: data.lastname,
        middleName: data.patronimic || null,
        email: data.email,
        birthdate: data.birth,
        passportSeries: data.passport_series,
        passportNumber: data.passport_num,
      };

      const response = await fetch('http://localhost:8080/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      console.log(response, 'respons Application');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.ok) {
        dispatch(resetState());
      }

      const loanOffers = await response.json();
      dispatch(setLoanOffers(loanOffers));
      dispatch(showLoanOffers());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trimWhitespace = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.trim();
  };

  const handleInputChange =
    (field: keyof FormInputs) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(updateFormData({ [field]: e.target.value }));
    };

  return (
    <section>
      <div className="apply-form-content">
        <div className="apply-slider-amount-block">
          <div className="apply-slider-block" id="credit-card-form">
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

        <div ref={formRef} role="form" aria-label="Contact information" className="credit-card-form">
          <h4 className="form-h4">Contact information</h4>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              {/* Last Name */}
              <div className="grid-item">
                <p className="form-p">
                  Your last name <span className="redstar">*</span>
                </p>
                <input
                  type="text"
                  className={`form-input ${errors.lastname ? 'error' : ''} ${dirtyFields.lastname && !errors.lastname ? 'success' : ''}`}
                  {...register('lastname', {
                    required: 'Enter your last name',
                    onChange: handleInputChange('lastname'),
                  })}
                  placeholder="For example Doe"
                  onBlur={trimWhitespace}
                />
                {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
              </div>

              {/* First Name */}
              <div className="grid-item">
                <p className="form-p">
                  Your first name <span className="redstar">*</span>
                </p>
                <input
                  type="text"
                  className={`form-input ${errors.firstname ? 'error' : ''} ${dirtyFields.firstname && !errors.firstname ? 'success' : ''}`}
                  {...register('firstname', {
                    required: 'Enter your first name',
                    onChange: handleInputChange('firstname'),
                  })}
                  placeholder="For example John"
                  onBlur={trimWhitespace}
                />
                {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
              </div>

              {/* Patronymic */}
              <div className="grid-item">
                <p className="form-p">Your patronymic </p>
                <input
                  type="text"
                  className="form-input"
                  {...register('patronimic', {
                    onChange: handleInputChange('patronimic'),
                  })}
                  placeholder="For example Viktorovich"
                />
              </div>

              {/* Select Term */}
              <div className="grid-item">
                <p className="form-p">
                  Select term <span className="redstar">*</span>
                </p>
                <select
                  className="form-input"
                  {...register('select1', {
                    required: 'Please select a term',
                    onChange: handleInputChange('select1'),
                  })}
                >
                  <option value="">Select a term</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
                {errors.select1 && <p className="error-message">{errors.select1.message}</p>}
              </div>

              {/* Email */}
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
                    onChange: handleInputChange('email'),
                  })}
                  placeholder="test@gmail.com"
                  onBlur={trimWhitespace}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              {/* Date of Birth */}
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
                    onChange: handleInputChange('birth'),
                  })}
                />
                {errors.birth && <p className="error-message">{errors.birth.message}</p>}
              </div>

              {/* Passport Series */}
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
                    onChange: handleInputChange('passport_series'),
                  })}
                  placeholder="0000"
                  onBlur={trimWhitespace}
                />
                {errors.passport_series && <p className="error-message">{errors.passport_series.message}</p>}
              </div>

              {/* Passport Number */}
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
                    onChange: handleInputChange('passport_num'),
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
      </div>
    </section>
  );
};

export default ApplyForm;
