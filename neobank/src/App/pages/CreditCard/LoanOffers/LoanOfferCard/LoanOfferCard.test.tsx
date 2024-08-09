import { render, screen, fireEvent } from '@testing-library/react';
import LoanOfferCard, { LoanOfferData } from './LoanOfferCard';
import { vi } from 'vitest';

describe('LoanOfferCard', () => {
  const mockLoanOffer: LoanOfferData = {
    applicationId: 1,
    requestedAmount: 500000,
    totalAmount: 600000,
    term: 36,
    monthlyPayment: 20000,
    rate: 7.5,
    isInsuranceIncluded: true,
    isSalaryClient: false,
  };

  const mockOnSelect = vi.fn();

  it('renders the component with correct data', () => {
    render(<LoanOfferCard {...mockLoanOffer} onSelect={mockOnSelect} />);

    expect(screen.getByText('Requested amount: 500,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Total amount: 600,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('For 36 months')).toBeInTheDocument();
    expect(screen.getByText('Monthly payment: 20,000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Your rate: 7.5%')).toBeInTheDocument();
    expect(screen.getByText('Insurance included:')).toBeInTheDocument();
    expect(screen.getByText('Salary client:')).toBeInTheDocument();

    const insuranceIcon = screen.getByText('Insurance included:').querySelector('span');
    expect(insuranceIcon).toHaveClass('yes');

    const salaryIcon = screen.getByText('Salary client:').querySelector('span');
    expect(salaryIcon).toHaveClass('not');
  });

  it('calls the onSelect function with the correct data when clicked', () => {
    render(<LoanOfferCard {...mockLoanOffer} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /Select/i }));

    expect(mockOnSelect).toHaveBeenCalledWith(mockLoanOffer);
  });

  it('displays loading state after button click', () => {
    render(<LoanOfferCard {...mockLoanOffer} onSelect={mockOnSelect} />);

    const button = screen.getByRole('button', { name: /Select/i });
    fireEvent.click(button);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
