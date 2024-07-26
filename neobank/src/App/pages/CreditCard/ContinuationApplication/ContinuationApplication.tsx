import { RootState } from '@store/store';
import Button from '@components/Button/Button';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ContinuationApplication.scss';
import axios from 'axios';
import { setApplicationId, setFormData, resetState } from '@store/loanApplicationContinuationSlice';
import Header from '@components/Header';
import Footer from '@components/Footer/Footer';
import ConfirmationTemplate from '@components/ConfirmationTemplate/ConfirmationTemplate';

export type ContinuationFormData = {
  gender: 'MALE' | 'FEMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER';
  employerINN: string;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
};

const ContinuationApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { id: applicationId, formData: savedFormData } = useSelector((state: RootState) => state.loanApplicationCont);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContinuationFormData>({
    defaultValues: savedFormData || {},
    mode: 'onChange',
  });

  useEffect(() => {
    if (id && id !== applicationId) {
      dispatch(setApplicationId(id));
    }
  }, [id, applicationId, dispatch]);

  useEffect(() => {
    if (savedFormData) {
      Object.entries(savedFormData).forEach(([key, value]) => {
        setValue(key as keyof ContinuationFormData, value);
      });
    }
  }, [savedFormData, setValue]);

  const onSubmit = async (data: ContinuationFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`http://localhost:8080/application/registration/${id}`, {
        ...data,
        employment: {
          employmentStatus: data.employmentStatus,
          employerINN: data.employerINN,
          salary: data.salary,
          position: data.position,
          workExperienceTotal: data.workExperienceTotal,
          workExperienceCurrent: data.workExperienceCurrent,
        },
        account: '11223344556677889900',
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        dispatch(resetState());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFieldChange = (
  //   name: keyof ContinuationFormData,
  //   value: ContinuationFormData[keyof ContinuationFormData] | Date,
  // ) => {
  //   if (savedFormData !== null) {
  //     if (name === 'passportIssueDate' && value instanceof Date) {
  //       dispatch(setFormData({ ...savedFormData, [name]: value.toISOString() }));
  //     } else {
  //       dispatch(setFormData({ ...savedFormData, [name]: value as ContinuationFormData[keyof ContinuationFormData] }));
  //     }
  //   }
  // };

  const handleFieldChange = (
    name: keyof ContinuationFormData,
    value: ContinuationFormData[keyof ContinuationFormData] | Date,
  ) => {
    let updatedValue = value;
    if (name === 'passportIssueDate' && value instanceof Date) {
      updatedValue = value.toISOString();
    }
    dispatch(setFormData({ ...savedFormData, [name]: updatedValue } as ContinuationFormData));
  };

  const watchAllFields = watch();

  if (isSubmitted) {
    return (
      <ConfirmationTemplate
        title={'Wait for a decision on the application'}
        message={'The answer will come to your mail within 10 minutes'}
      />
    );
  }

  return (
    <section>
      <Header />
      <div className="form-content">
        <div className="form-block">
          <div className="form-text">
            <h3 className="form-text-title">Continuation of the application</h3>
            <p className="form-text-p"> Step 2 of 5</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-grid_next">
              <div className="form-item input1">
                <label className="form-p">
                  What's your gender <span className="redstar">*</span>
                </label>
                <select
                  {...register('gender', { required: 'Select one of the options' })}
                  className={`input ${errors.gender ? 'error' : watchAllFields.gender ? 'success' : ''}`}
                  onChange={(e) => {
                    register('gender').onChange(e);
                    handleFieldChange('gender', e.target.value as ContinuationFormData['gender']);
                  }}
                >
                  <option value=""></option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                {errors.gender && <span className="error">{errors.gender.message}</span>}
              </div>

              <div className="form-item input2">
                <label className="form-p">
                  Your marital status <span className="redstar">*</span>
                </label>
                <select
                  {...register('maritalStatus', { required: 'Select one of the options' })}
                  onChange={(e) => {
                    register('maritalStatus').onChange(e);
                    handleFieldChange('maritalStatus', e.target.value as ContinuationFormData['maritalStatus']);
                  }}
                  className={`input ${errors.maritalStatus ? 'error' : watchAllFields.maritalStatus ? 'success' : ''}`}
                >
                  <option value=""></option>
                  <option value="MARRIED">Married</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="SINGLE">Single</option>
                  <option value="WIDOW_WIDOWER">Widow/Widower</option>
                </select>
                {errors.maritalStatus && <span className="error">{errors.maritalStatus.message}</span>}
              </div>

              <div className="form-item input3">
                <label className="form-p">
                  Your number of dependents <span className="redstar">*</span>
                </label>
                <select
                  {...register('dependentAmount', { required: 'Select one of the options' })}
                  onChange={(e) => {
                    register('dependentAmount').onChange(e);
                    handleFieldChange('dependentAmount', Number(e.target.value));
                  }}
                  className={`input ${errors.dependentAmount ? 'error' : watchAllFields.dependentAmount ? 'success' : ''}`}
                >
                  <option value=""></option>
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                {errors.dependentAmount && <span className="error">{errors.dependentAmount.message}</span>}
              </div>

              <div className="form-item input4">
                <label className="form-p">
                  Date of issue of the passport <span className="redstar">*</span>
                </label>

                <Controller
                  control={control}
                  name="passportIssueDate"
                  rules={{
                    required: 'Incorrect date of passport issue date',
                    validate: (value) => {
                      const date = value ? new Date(value) : null;
                      return !date || date <= new Date() || 'Date cannot be in the future';
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="date"
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        field.onChange(date ? date.toISOString() : '');
                        handleFieldChange('passportIssueDate', date || '');
                      }}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      className={`input ${errors.passportIssueDate ? 'error' : watchAllFields.passportIssueDate ? 'success' : ''}`}
                      placeholder="Select Date and Time"
                    />
                  )}
                />
                {errors.passportIssueDate && <span className="error">{errors.passportIssueDate.message}</span>}
              </div>

              <div className="form-item input5">
                <label className="form-p">
                  Division code <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.passportIssueBranch ? 'error' : watchAllFields.passportIssueBranch?.length === 6 ? 'success' : 'error'}`}
                  {...register('passportIssueBranch', {
                    required: 'The series must be 6 digits',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Must be exactly 6 digits',
                    },
                  })}
                  onChange={(e) => {
                    register('passportIssueBranch').onChange(e);
                    handleFieldChange('passportIssueBranch', e.target.value);
                  }}
                  placeholder="000000"
                />
                {errors.passportIssueBranch && <span className="error">{errors.passportIssueBranch.message}</span>}
              </div>
            </div>
            <h4 className="form-h4">Employment</h4>
            <div className="form-grid-employment">
              <div className="form-item">
                <label className="form-p">
                  Your employment status <span className="redstar">*</span>
                </label>
                <select
                  {...register('employmentStatus', { required: 'Select one of the options' })}
                  onChange={(e) => {
                    register('employmentStatus').onChange(e);
                    handleFieldChange('employmentStatus', e.target.value as ContinuationFormData['employmentStatus']);
                  }}
                  className={`input ${errors.employmentStatus ? 'error' : watchAllFields.employmentStatus ? 'success' : ''}`}
                >
                  <option value=""></option>
                  <option value="UNEMPLOYED">Unemployed</option>
                  <option value="SELF_EMPLOYED">Self-employed</option>
                  <option value="EMPLOYED">Employed</option>
                  <option value="BUSINESS_OWNER">Business owner</option>
                </select>
                {errors.employmentStatus && <span className="error">{errors.employmentStatus.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your employer INN <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.employerINN ? 'error' : watchAllFields.employerINN?.length === 12 ? 'success' : 'error'}`}
                  {...register('employerINN', {
                    required: 'Department code must be 12 digits',
                    pattern: {
                      value: /^\d{12}$/,
                      message: 'Must be exactly 12 digits',
                    },
                  })}
                  onChange={(e) => {
                    register('employerINN').onChange(e);
                    handleFieldChange('employerINN', e.target.value);
                  }}
                  placeholder="000000000000"
                />
                {errors.employerINN && <span className="error">{errors.employerINN.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your salary <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.salary ? 'error' : watchAllFields.salary ? 'success' : ''}`}
                  type="number"
                  {...register('salary', { required: 'Enter your salary' })}
                  onChange={(e) => {
                    register('salary').onChange(e);
                    handleFieldChange('salary', Number(e.target.value));
                  }}
                  placeholder="For example 100 000"
                />
                {errors.salary && <span className="error">{errors.salary.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your position <span className="redstar">*</span>
                </label>
                <select
                  {...register('position', { required: 'Select one of the options' })}
                  onChange={(e) => {
                    register('position').onChange(e);
                    handleFieldChange('position', e.target.value as ContinuationFormData['position']);
                  }}
                  className={`input ${errors.position ? 'error' : watchAllFields.position ? 'success' : ''}`}
                >
                  <option value=""></option>
                  <option value="WORKER">Worker</option>
                  <option value="MID_MANAGER">Mid Manager</option>
                  <option value="TOP_MANAGER">Top Manager</option>
                  <option value="OWNER">Owner</option>
                </select>
                {errors.position && <span className="error">{errors.position.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your work experience total <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.workExperienceTotal ? 'error' : watchAllFields.workExperienceTotal ? 'success' : ''}`}
                  type="number"
                  {...register('workExperienceTotal', {
                    required: 'Enter your work experience total',
                    max: { value: 99, message: 'Cannot exceed 99' },
                  })}
                  onChange={(e) => {
                    register('workExperienceTotal').onChange(e);
                    handleFieldChange('workExperienceTotal', Number(e.target.value));
                  }}
                  placeholder="For example 10"
                />
                {errors.workExperienceTotal && <span className="error">{errors.workExperienceTotal.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your work experience current <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.workExperienceCurrent ? 'error' : watchAllFields.workExperienceCurrent ? 'success' : ''}`}
                  type="number"
                  {...register('workExperienceCurrent', {
                    required: 'Enter your work experience current',
                    max: { value: 99, message: 'Cannot exceed 99' },
                  })}
                  onChange={(e) => {
                    register('workExperienceCurrent').onChange(e);
                    handleFieldChange('workExperienceCurrent', Number(e.target.value));
                  }}
                  placeholder="For example 2"
                />
                {errors.workExperienceCurrent && <span className="error">{errors.workExperienceCurrent.message}</span>}
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
      <Footer />
    </section>
  );
};

export default ContinuationApplication;
