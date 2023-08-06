import { useReducer } from "react";
import styles from "./Input.module.css";

const CHANGE = "change";

interface ReducerState {
  value: string;
  isValid: boolean;
}
interface ReducerAction {
  type: "change";
  payload: any;
}

const inputReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case CHANGE:
      return {
        isValid: true,
        value: action.payload,
      };
    default:
      return state;
  }
};

interface InputProps {
  id: string;
  title: string;
  type: string;
  elementType: "input" | "textarea";
  placeholder?: string;
  rows?: number;
  errorMsg?: string;
}

const Input: React.FC<InputProps> = ({
  elementType,
  id,
  title,
  type,
  placeholder,
  rows,
  errorMsg,
}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: "change", payload: value });
  };

  let element;
  if (elementType === "input")
    element = (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeInputHandler}
        value={state.value}
      />
    );
  else if (elementType === "textarea")
    element = <textarea id={id} rows={rows || 3} value={state.value} />;

  return (
    <div
      className={`${styles["form-control"]} ${
        !state.isValid ? `${styles["form-control--invalid"]}` : ""
      }`}
    >
      <label htmlFor={id}>{title}</label>
      {element}
      {!state.isValid && <p>{errorMsg}</p>}
    </div>
  );
};

export default Input;
