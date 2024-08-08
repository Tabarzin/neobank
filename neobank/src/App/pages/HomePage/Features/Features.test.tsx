import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Features from './Features';

vi.mock('@assets/images/features_image.svg', () => ({
  __esModule: true,
  default: 'mock-image-src',
}));

describe('Features Component', () => {
  it('renders the features section', () => {
    render(<Features />);

    const image = screen.getByAltText('Features Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-image-src');

    const heading = screen.getByText(/We Provide Many Features You Can Use/i);
    expect(heading).toBeInTheDocument();

    const subtitle = screen.getByText(
      /You can explore the features that we provide with fun and have their own functions each feature/i,
    );
    expect(subtitle).toBeInTheDocument();

    const listItems = [
      'Powerfull online protection.',
      'Cashback without borders',
      'Personal design',
      'Work anywhere in the world',
    ];

    listItems.forEach((item) => {
      const listItem = screen.getByText(item);
      expect(listItem).toBeInTheDocument();
    });
  });
});
