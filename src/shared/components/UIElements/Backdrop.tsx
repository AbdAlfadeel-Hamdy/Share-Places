import ReactDOM from "react-dom";

import styles from "./Backdrop.module.css";

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
