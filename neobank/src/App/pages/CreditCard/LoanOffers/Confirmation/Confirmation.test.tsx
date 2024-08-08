import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Confirmation from './Confirmation';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('Confirmation', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays "No offer selected" when selectedOffer is not available', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(undefined);

    render(<Confirmation />);

    expect(screen.getByText('No offer selected')).toBeInTheDocument();
  });

  it('displays confirmation content when selectedOffer is available', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      id: 1,
      name: 'Mock Offer',
    });

    render(<Confirmation />);

    expect(screen.getByText('The preliminary decision has been sent to your email.')).toBeInTheDocument();
    expect(
      screen.getByText('In the letter you can get acquainted with the preliminary decision on the credit card.'),
    ).toBeInTheDocument();
  });
});
