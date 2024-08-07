import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetCard from './GetCard';

describe('App component', () => {
  test('renders App component', () => {
    render(
      <MemoryRouter>
        <GetCard />
      </MemoryRouter>,
    );
  });
});
