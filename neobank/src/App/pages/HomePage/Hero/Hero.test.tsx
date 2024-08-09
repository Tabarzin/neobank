import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the heading, button, and images correctly', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', {
      name: /choose the design you like and apply for card right now/i,
    });
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /choose the card/i });
    expect(button).toBeInTheDocument();

    const images = screen.getAllByAltText(/banking card/i);
    expect(images.length).toBe(4);
  });
});
