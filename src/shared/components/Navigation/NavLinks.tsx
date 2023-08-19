import { NavLink } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/auth-context";

import styles from "./NavLinks.module.css";

const NavLinks: React.FC = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {loggedInUser && (
        <li>
          <NavLink to={`/${loggedInUser.id}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {loggedInUser && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!loggedInUser && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {loggedInUser && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
