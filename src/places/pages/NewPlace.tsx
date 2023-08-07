import { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import styles from "./NewPlace.module.css";
import Button from "../../shared/components/FormElements/Button";

enum FormActionKind {
  INPUT_CHANGE = "INPUT_CHANGE",
}

export interface FormState {
  inputs: { [keys: string]: { value: string; isValid: boolean } };
  isValid: boolean;
}

interface FormAction {
  type: FormActionKind;
  payload: {
    value: string;
    isValid: boolean;
    inputId: string;
  };
}

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActionKind.INPUT_CHANGE: {
      const { inputId, value, isValid } = action.payload;
      let formIsValid = true;
      for (const input in state.inputs) {
        if (input === inputId) formIsValid = formIsValid && isValid;
        else formIsValid = formIsValid && state.inputs[input].isValid;
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputId]: { value, isValid },
        },
        isValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

const NewPlace: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, {
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

  const inputChangeHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: FormActionKind.INPUT_CHANGE,
        payload: {
          value,
          isValid,
          inputId: id,
        },
      });
    },
    []
  );
  return (
    <form className={styles["place-form"]}>
      <Input
        id="title"
        elementType="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid title."
        onChange={inputChangeHandler}
      />
      <Input
        id="description"
        elementType="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMsg="Please enter a valid description (at least 5 charachters)."
        onChange={inputChangeHandler}
      />
      <Input
        id="address"
        elementType="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid address."
        onChange={inputChangeHandler}
      />
      <Button type="submit" disabled={!state.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
