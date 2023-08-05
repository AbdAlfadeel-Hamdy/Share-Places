import styles from "./MainHeader.module.css";

interface MainHeaderProps {
  children: React.ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = ({ children }) => {
  return <header className={styles["main-header"]}>{children}</header>;
};

export default MainHeader;
