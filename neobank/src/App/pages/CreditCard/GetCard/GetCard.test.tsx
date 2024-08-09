import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetCard from './GetCard';

describe('GetCard component', () => {
  it('renders GetCard component', () => {
    render(
      <MemoryRouter>
        <GetCard />
      </MemoryRouter>,
    );
  });
});
