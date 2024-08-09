import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardInfo from './CardInfo';

vi.mock('../CreditCardNavMenu/CreditCardNavMenu', () => ({
  default: () => <div data-testid="credit-card-nav-menu">Mocked Nav Menu</div>,
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/card' }),
  };
});

describe('CardInfo', () => {
  it('renders CreditCardNavMenu', () => {
    render(
      <MemoryRouter initialEntries={['/credit-card/about']}>
        <Routes>
          <Route path="/credit-card/*" element={<CardInfo />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('credit-card-nav-menu')).toBeInTheDocument();
  });

  it('renders Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/credit-card/about']}>
        <Routes>
          <Route path="/credit-card/*" element={<CardInfo />}>
            <Route path="about" element={<div>About Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('About Content')).toBeInTheDocument();
  });

  it('navigates to /credit-card/about when path is /card', () => {
    render(
      <MemoryRouter initialEntries={['/card']}>
        <CardInfo />
      </MemoryRouter>,
    );

    expect(navigateMock).toHaveBeenCalledWith('/credit-card/about', { replace: true });
  });
});
