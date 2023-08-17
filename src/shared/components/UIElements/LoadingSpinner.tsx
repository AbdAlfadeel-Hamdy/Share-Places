import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && styles["loading-spinner__overlay"]}`}>
      <div className={`${styles["lds-dual-ring"]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
