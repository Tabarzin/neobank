import Button from '@components/Button/Button';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import './ContinuationApplication.scss';

type FormData = {
  gender: 'MALE' | 'FEMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: Date;
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section>
      <div className="form-content">
        <div className="form-block">
          <div className="form-text">
            <h3 className="form-text-title">Customize your card</h3>
            <p className="form-text-p"> Step 2 of 5</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-grid">
              <div className="form-item input1">
                <label className="form-p">
                  What's your gender <span className="redstar">*</span>
                </label>
                <select
                  {...register('gender', { required: 'Select one of the options' })}
                  className={`input ${errors.gender ? 'error' : ''} ${dirtyFields.gender && !errors.gender ? 'success' : ''}`}
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
                  className={`input ${errors.maritalStatus ? 'error' : ''} ${dirtyFields.maritalStatus && !errors.maritalStatus ? 'success' : ''}`}
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
                  className={`input ${errors.dependentAmount ? 'error' : ''} ${dirtyFields.dependentAmount && !errors.dependentAmount ? 'success' : ''}`}
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
                    validate: (value) => new Date(value) <= new Date() || 'Date cannot be in the future',
                  }}
                  render={({ field }) => (
                    <input
                      type="date"
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`input ${errors.passportIssueDate ? 'error' : ''} ${dirtyFields.passportIssueDate && !errors.passportIssueDate ? 'success' : ''}`}
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
                  className={`input ${errors.passportIssueBranch ? 'error' : ''} ${dirtyFields.passportIssueBranch && !errors.passportIssueBranch ? 'success' : ''}`}
                  {...register('passportIssueBranch', {
                    required: 'The series must be 6 digits',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Must be exactly 6 digits',
                    },
                  })}
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
                  className={`input ${errors.employmentStatus ? 'error' : ''} ${dirtyFields.employmentStatus && !errors.employmentStatus ? 'success' : ''}`}
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
                  className={`input ${errors.employerINN ? 'error' : ''} ${dirtyFields.employerINN && !errors.employerINN ? 'success' : ''}`}
                  {...register('employerINN', {
                    required: 'Department code must be 12 digits',
                    pattern: {
                      value: /^\d{12}$/,
                      message: 'Must be exactly 12 digits',
                    },
                  })}
                  placeholder="000000000000"
                />
                {errors.employerINN && <span className="error">{errors.employerINN.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your salary <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.salary ? 'error' : ''} ${dirtyFields.salary && !errors.salary ? 'success' : ''}`}
                  type="number"
                  {...register('salary', { required: 'Enter your salary' })}
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
                  className={`input ${errors.position ? 'error' : ''} ${dirtyFields.position && !errors.position ? 'success' : ''}`}
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
                  className={`input ${errors.workExperienceTotal ? 'error' : ''} ${dirtyFields.workExperienceTotal && !errors.workExperienceTotal ? 'success' : ''}`}
                  type="number"
                  {...register('workExperienceTotal', {
                    required: 'Enter your work experience total',
                    max: { value: 99, message: 'Cannot exceed 99' },
                  })}
                  placeholder="For example 10"
                />
                {errors.workExperienceTotal && <span className="error">{errors.workExperienceTotal.message}</span>}
              </div>

              <div className="form-item">
                <label className="form-p">
                  Your work experience current <span className="redstar">*</span>
                </label>
                <input
                  className={`input ${errors.workExperienceCurrent ? 'error' : ''} ${dirtyFields.workExperienceCurrent && !errors.workExperienceCurrent ? 'success' : ''}`}
                  type="number"
                  {...register('workExperienceCurrent', {
                    required: 'Enter your work experience current',
                    max: { value: 99, message: 'Cannot exceed 99' },
                  })}
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
    </section>
  );
};

export default ContinuationApplication;
