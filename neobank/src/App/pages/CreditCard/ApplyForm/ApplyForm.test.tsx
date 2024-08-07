import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ApplyForm from './ApplyForm';
import { store } from '@store/store';

describe('ApplyForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ApplyForm />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('renders last name input and allows typing', () => {
    const lastNameInput = screen.getByPlaceholderText('For example Doe');
    expect(lastNameInput).toBeInTheDocument();
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    expect(lastNameInput).toHaveValue('Smith');
  });

  test('renders first name input and allows typing', () => {
    const firstNameInput = screen.getByPlaceholderText('For example John');
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');
  });

  test('renders email input and allows typing', () => {
    const emailInput = screen.getByPlaceholderText('test@gmail.com');
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('renders date of birth input and allows typing', () => {
    const birthInput = screen.getByLabelText(/your date of birth/i);
    expect(birthInput).toBeInTheDocument();
    fireEvent.change(birthInput, { target: { value: '1990-01-01' } });
    expect(birthInput).toHaveValue('1990-01-01');
  });

  test('renders passport series input and allows typing', () => {
    const passportSeriesInput = screen.getByPlaceholderText('0000');
    expect(passportSeriesInput).toBeInTheDocument();
    fireEvent.change(passportSeriesInput, { target: { value: '1234' } });
    expect(passportSeriesInput).toHaveValue('1234');
  });

  test('renders passport number input and allows typing', () => {
    const passportNumberInput = screen.getByPlaceholderText('000000');
    expect(passportNumberInput).toBeInTheDocument();
    fireEvent.change(passportNumberInput, { target: { value: '123456' } });
    expect(passportNumberInput).toHaveValue('123456');
  });

  test('renders select term input and allows selection', () => {
    const selectInput = screen.getByRole('combobox');
    expect(selectInput).toBeInTheDocument();
    fireEvent.change(selectInput, { target: { value: '12' } });
    expect(selectInput).toHaveValue('12');
  });
});
