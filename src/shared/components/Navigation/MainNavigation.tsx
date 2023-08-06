import { Link } from "react-router-dom";
import React, { useState } from "react";
import MainHeader from "./MainHeader";
import styles from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className={styles["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={styles["main-navigation__menu-btn"]}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={styles["main-navigation__title"]}>
          <Link to="/">SharePlaces</Link>
        </h1>
        <nav className={styles["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
