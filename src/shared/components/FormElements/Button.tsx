import { Link } from "react-router-dom";

import styles from "./Button.module.css";

interface ButtonProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  size?: number;
  danger?: boolean;
  inverse?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  href,
  to,
  children,
  inverse,
  danger,
  disabled,
  type,
  size,
  onClick,
}) => {
  if (href) {
    return (
      <a
        className={`${styles.button} ${
          styles[`button--${size || "default"}`]
        }} ${inverse && styles["button--inverse"]} ${
          danger && styles["button--danger"]
        }`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${
          styles[`button--${size || "default"}`]
        } ${inverse && styles["button--inverse"]} ${
          danger && styles["button--danger"]
        }`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.button} ${styles[`button--${size || "default"}`]} ${
        inverse && styles["button--inverse"]
      } ${danger && styles["button--danger"]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
