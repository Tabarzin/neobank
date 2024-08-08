import { render, screen, fireEvent } from '@testing-library/react';
import CreditCardHero from './CreditCardHero';
import '@testing-library/jest-dom';

describe('CreditCardHero', () => {
  test('renders the component correctly', () => {
    render(<CreditCardHero buttonText="Apply Now" targetId="target-id" />);

    expect(screen.getByText('Platinum digital credit card')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without commission and interest.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('Up to 600 000')).toBeInTheDocument();
    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByText('Apply Now')).toBeInTheDocument();
    expect(screen.getByAltText('Credit Card')).toBeInTheDocument();
  });

  test('calls the handleClick function when the button is clicked', () => {
    const mockScrollIntoView = vi.fn();
    global.document.getElementById = vi.fn(() => ({
      scrollIntoView: mockScrollIntoView,
    }));

    render(<CreditCardHero buttonText="Apply Now" targetId="target-id" />);

    fireEvent.click(screen.getByText('Apply Now'));

    expect(global.document.getElementById).toHaveBeenCalledWith('target-id');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('displays the tooltip correctly', () => {
    render(<CreditCardHero buttonText="Apply Now" targetId="target-id" />);

    fireEvent.mouseEnter(screen.getByText('No percent'));
    expect(screen.getByText('When repaying the full debt up to 160 days.')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Credit limit'));
    expect(screen.getByText('Over the limit will accrue percent')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Card service is free'));
    expect(screen.getByText('Promotion valid until December 31, 2024.')).toBeInTheDocument();
  });
});
