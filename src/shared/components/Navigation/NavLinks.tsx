import { NavLink } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/auth-context";

import styles from "./NavLinks.module.css";

const NavLinks: React.FC = () => {
  const { userId, token, logout } = useContext(AuthContext);
  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {token && (
        <li>
          <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {token && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!token && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {token && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
