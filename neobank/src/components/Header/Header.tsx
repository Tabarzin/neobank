import Button from '../Button/Button';
import './Header.scss';
import Logo from './Logo/Logo';
import NavMenu from './NavMenu/NavMenu';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
      <Button>Button</Button>
    </header>
  );
};

export default Header;
