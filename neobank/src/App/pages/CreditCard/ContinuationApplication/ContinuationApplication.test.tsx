import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import loanApplicationContinuationReducer, { setFormData } from '@store/loanApplicationContinuationSlice';
import ContinuationApplication from './ContinuationApplication';

describe('ContinuationApplication', () => {
  it('should render the form', () => {
    const store = configureStore({
      reducer: {
        loanApplicationCont: loanApplicationContinuationReducer,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ContinuationApplication />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('What is your gender *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your marital status *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your number of dependents *')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of issue of the passport *')).toBeInTheDocument();
    expect(screen.getByLabelText('Division code *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your employment status *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your employer INN *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your salary *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your position *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your work experience total *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your work experience current *')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should update form data on input change', () => {
    const store = configureStore({
      reducer: {
        loanApplicationCont: loanApplicationContinuationReducer,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ContinuationApplication />
        </Provider>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('What is your gender *'), { target: { value: 'MALE' } });
    fireEvent.change(screen.getByLabelText('Your marital status *'), { target: { value: 'MARRIED' } });
    fireEvent.change(screen.getByLabelText('Your number of dependents *'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Date of issue of the passport *'), { target: { value: '2023-06-01' } });
    fireEvent.change(screen.getByLabelText('Division code *'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Your employment status *'), { target: { value: 'EMPLOYED' } });
    fireEvent.change(screen.getByLabelText('Your employer INN *'), { target: { value: '123456789012' } });
    fireEvent.change(screen.getByLabelText('Your salary *'), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText('Your position *'), { target: { value: 'WORKER' } });
    fireEvent.change(screen.getByLabelText('Your work experience total *'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Your work experience current *'), { target: { value: '2' } });

    function stripTimeFromDates(data) {
      return {
        ...data,
        passportIssueDate: data.passportIssueDate.split('T')[0],
      };
    }

    const { loanApplicationCont } = store.getState();
    expect(stripTimeFromDates(loanApplicationCont.formData)).toEqual({
      gender: 'MALE',
      maritalStatus: 'MARRIED',
      dependentAmount: 2,
      passportIssueDate: '2023-06-01',
      passportIssueBranch: '123456',
      employmentStatus: 'EMPLOYED',
      employerINN: '123456789012',
      salary: 50000,
      position: 'WORKER',
      workExperienceTotal: 5,
      workExperienceCurrent: 2,
    });
  });

  it('renders the continue button with correct label', () => {
    const store = configureStore({
      reducer: {
        loanApplicationCont: loanApplicationContinuationReducer,
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ContinuationApplication />
        </Provider>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
