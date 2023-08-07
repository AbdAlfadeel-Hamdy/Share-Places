import useForm from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import styles from "./PlaceForm.module.css";

const NewPlace: React.FC = () => {
  const { state, changeInputHandler } = useForm({
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  return (
    <form className={styles["place-form"]}>
      <Input
        id="title"
        elementType="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid title."
        onChange={changeInputHandler}
      />
      <Input
        id="description"
        elementType="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMsg="Please enter a valid description (at least 5 charachters)."
        onChange={changeInputHandler}
      />
      <Input
        id="address"
        elementType="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid address."
        onChange={changeInputHandler}
      />
      <Button type="submit" disabled={!state.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
