import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConfirmationTemplate from './ConfirmationTemplate';

describe('ConfirmationTemplate', () => {
  it('should render the title and message', () => {
    const title = 'Confirmation';
    const message = 'Check your email.';
    render(
      <MemoryRouter>
        <ConfirmationTemplate title={title} message={message} />
      </MemoryRouter>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should render the children', () => {
    const title = 'Confirmation';
    const message = 'Your order has been placed.';
    const children = <div>Additional content</div>;
    render(
      <MemoryRouter>
        <ConfirmationTemplate title={title} message={message}>
          {children}
        </ConfirmationTemplate>
      </MemoryRouter>,
    );

    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });
});
