import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render the button with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call the onClick function when the button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have the correct button type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should have the correct additional className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
