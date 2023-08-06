import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

interface ModalOverlayProps {
  show: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  onSubmit?: () => void;
  className?: string;
  header?: string | React.ReactNode;
  headerClass?: string;
  contentClass?: string;
  footer?: string | React.ReactNode;
  footerClass?: string;
  children?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  style,
  className,
  header,
  headerClass,
  contentClass,
  footer,
  footerClass,
  onSubmit,
  children,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal: React.FC<ModalOverlayProps> = ({ ...props }) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onClick} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
