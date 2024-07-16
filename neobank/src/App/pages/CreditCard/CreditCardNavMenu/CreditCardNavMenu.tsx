import React from 'react';
import { NavLink } from 'react-router-dom';
import './CreditCardNavMenu.scss';

const CreditCardNavMenu: React.FC = () => {
  return (
    <nav className="credit-card-navmenu">
      <ul className="credit-card-navmenu__links">
        <li>
          <NavLink
            to="/credit-card/about"
            end
            className={({ isActive }) =>
              `credit-card-navmenu__links_link ${isActive ? 'credit-card-navmenu__links_link--active' : ''}`
            }
          >
            About card
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/credit-card/rates"
            className={({ isActive }) =>
              `credit-card-navmenu__links_link ${isActive ? 'credit-card-navmenu__links_link--active' : ''}`
            }
          >
            Rates and conditions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/credit-card/cashback"
            className={({ isActive }) =>
              `credit-card-navmenu__links_link ${isActive ? 'credit-card-navmenu__links_link--active' : ''}`
            }
          >
            Cashback
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/credit-card/faq"
            className={({ isActive }) =>
              `credit-card-navmenu__links_link ${isActive ? 'credit-card-navmenu__links_link--active' : ''}`
            }
          >
            FAQ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default CreditCardNavMenu;
