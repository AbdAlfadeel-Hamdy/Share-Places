import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css";

const NavLinks: React.FC = () => {
  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
