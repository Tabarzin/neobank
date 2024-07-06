import './Button.scss';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className, disabled }) => {
  return (
    <button type={type} onClick={onClick} className={classNames('button', className)} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
