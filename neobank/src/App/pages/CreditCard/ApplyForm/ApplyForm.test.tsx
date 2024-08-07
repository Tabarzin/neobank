import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ApplyForm from './ApplyForm';
import { store } from '@store/store';

describe('ApplyForm', () => {
  test('renders last name input and allows typing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ApplyForm />
        </MemoryRouter>
      </Provider>,
    );

    const lastNameInput = screen.getByPlaceholderText('For example Doe');
    expect(lastNameInput).toBeInTheDocument();
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    expect(lastNameInput).toHaveValue('Smith');
  });
});
