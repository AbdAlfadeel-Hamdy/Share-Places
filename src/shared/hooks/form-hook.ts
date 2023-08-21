import { useCallback, useReducer } from "react";

enum FormActionKind {
  INPUT_CHANGE = "INPUT_CHANGE",
  SET_DATA = "SET_DATA",
}

export interface FormState {
  inputs: { [keys: string]: { value: string | File | null; isValid: boolean } };
  isValid: boolean;
}

interface Payload {
  value: string | File | null;
  isValid: boolean;
  inputId: string;
}

interface FormAction {
  type: FormActionKind;
  payload: Payload | FormState;
}

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActionKind.INPUT_CHANGE: {
      const { inputId, value, isValid } = action.payload as Payload;
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
    case FormActionKind.SET_DATA: {
      const { inputs, isValid } = action.payload as FormState;
      return {
        inputs,
        isValid,
      };
    }
    default:
      return state;
  }
};

const useForm = ({ inputs, isValid }: FormState) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs,
    isValid,
  });

  const changeInputHandler = useCallback(
    (id: string, value: string | File | null, isValid: boolean) => {
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

  const setFormData = useCallback(({ inputs, isValid }: FormState) => {
    dispatch({ type: FormActionKind.SET_DATA, payload: { inputs, isValid } });
  }, []);

  return {
    state,
    changeInputHandler,
    setFormData,
  };
};

export default useForm;
