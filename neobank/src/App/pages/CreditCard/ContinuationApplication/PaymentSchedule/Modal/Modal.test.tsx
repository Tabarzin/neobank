import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    const title = screen.getByText('Test Modal');
    expect(title).toBeInTheDocument();

    const content = screen.getByText('Modal content');
    expect(content).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /×/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    const title = screen.queryByText('Test Modal');
    expect(title).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
