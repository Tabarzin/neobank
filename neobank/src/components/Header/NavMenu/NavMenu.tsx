import { NavLink } from 'react-router-dom';
import './NavMenu.scss';

const NavMenu = () => {
  return (
    <nav className="navmenu">
      <ul className="navmenu__links">
        <li>
          <NavLink to="/card" className="navmenu__links_link">
            Credit Card
          </NavLink>
        </li>
        <li>Product</li>
        <li>Account</li>
        <li>Resources</li>
      </ul>
    </nav>
  );
};

export default NavMenu;
