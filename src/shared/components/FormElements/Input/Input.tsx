import { useReducer, useEffect } from "react";
import styles from "./Input.module.css";
import { InputActionKind, inputReducer } from "./input-reducer";

export interface InputProps {
  id: string;
  title: string;
  type?: string;
  elementType: "input" | "textarea";
  placeholder?: string;
  rows?: number;
  errorMsg?: string;
  validators?: { type: string; val?: number }[];
  onChange: (id: string, value: string, isValid: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  elementType,
  id,
  title,
  type,
  placeholder,
  rows,
  errorMsg,
  validators,
  onChange,
}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const changeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    dispatch({ type: InputActionKind.CHANGE, payload: { value, validators } });
  };

  const touchInputHandler = () => {
    dispatch({ type: InputActionKind.TOUCH });
  };

  useEffect(() => {
    onChange(id, state.value, state.isValid);
  }, [onChange, id, state.value, state.isValid]);

  let element;
  if (elementType === "input")
    element = (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeInputHandler}
        onBlur={touchInputHandler}
        value={state.value}
      />
    );
  else if (elementType === "textarea")
    element = (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeInputHandler}
        value={state.value}
        onBlur={touchInputHandler}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} ${
        !state.isValid && state.isTouched
          ? `${styles["form-control--invalid"]}`
          : ""
      }`}
    >
      <label htmlFor={id}>{title}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{errorMsg}</p>}
    </div>
  );
};

export default Input;
