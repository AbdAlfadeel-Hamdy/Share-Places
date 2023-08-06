import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.css";

interface SideDrawerProps {
  children: React.ReactNode;
  show: boolean;
  onClick: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={styles["side-drawer"]} onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;
