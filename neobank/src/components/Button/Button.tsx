import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled }) => {
  return (
    <button type={type} onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
