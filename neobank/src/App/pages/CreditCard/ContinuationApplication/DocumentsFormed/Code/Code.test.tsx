import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import Code from './Code';
import axios from 'axios';

vi.mock('axios');

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ applicationId: '123' }),
  };
});

describe('Code Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders ConfirmationTemplate with title', () => {
    render(
      <MemoryRouter>
        <Code />
      </MemoryRouter>,
    );
    expect(screen.getByText('Please enter confirmation code')).toBeInTheDocument();
  });

  it('renders 4 input fields', () => {
    render(
      <MemoryRouter>
        <Code />
      </MemoryRouter>,
    );
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('shows an error message on invalid code', async () => {
    (axios.post as any).mockRejectedValueOnce(new Error('Invalid confirmation code'));

    render(
      <MemoryRouter>
        <Code />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(screen.getByText('Invalid confirmation code')).toBeInTheDocument();
    });
  });
});
