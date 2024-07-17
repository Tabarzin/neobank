import { NavLink } from 'react-router-dom';
import './NavMenu.scss';

const NavMenu = () => {
  return (
    <nav className="navmenu">
      <ul className="navmenu__links">
        <li>
          <NavLink
            to="/credit-card"
            className={({ isActive }) =>
              isActive ? 'navmenu__links_link navmenu__links_link--active' : 'navmenu__links_link'
            }
          >
            Credit Card
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? 'navmenu__links_link navmenu__links_link--active' : 'navmenu__links_link'
            }
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? 'navmenu__links_link navmenu__links_link--active' : 'navmenu__links_link'
            }
          >
            Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? 'navmenu__links_link navmenu__links_link--active' : 'navmenu__links_link'
            }
          >
            Resources
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
