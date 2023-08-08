import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const NavLinks: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/1/places">MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
