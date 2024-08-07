import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Cashback from './Cashback';

describe('Cashback', () => {
  beforeEach(() => {
    render(<Cashback />);
  });

  it('renders correct cashback percentages', () => {
    expect(screen.getAllByText('5%')).toHaveLength(2);
    expect(screen.getByText('2%')).toBeInTheDocument();
    expect(screen.getByText('1%')).toBeInTheDocument();
    expect(screen.getByText('up to 3%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('renders correct cashback categories', () => {
    expect(screen.getByText('For food delivery, cafes and restaurants')).toBeInTheDocument();
    expect(screen.getByText('In supermarkets with our subscription')).toBeInTheDocument();
    expect(screen.getByText("In clothing stores and children's goods")).toBeInTheDocument();
    expect(screen.getByText('Other purchases and payment of services and fines')).toBeInTheDocument();
    expect(screen.getByText('Shopping in online stores')).toBeInTheDocument();
    expect(screen.getByText('Purchases from our partners')).toBeInTheDocument();
  });
});
