import Input from "../../shared/components/FormElements/Input";
import styles from "./NewPlace.module.css";

const NewPlace: React.FC = () => {
  return (
    <form className={styles["place-form"]}>
      <Input
        id="title"
        elementType="input"
        type="text"
        title="Title"
        errorMsg="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
