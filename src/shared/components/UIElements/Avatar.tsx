import styles from "./Avatar.module.css";

interface AvatarProps {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  style?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  image,
  alt,
  width,
  height,
  style,
  className,
}) => {
  return (
    <div className={`${styles.avatar} ${className}`}>
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </div>
  );
};

export default Avatar;
