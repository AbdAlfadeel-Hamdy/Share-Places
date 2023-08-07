import { validate } from "../../../utils/validators";

export enum InputActionKind {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH",
}

export interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}
export interface InputAction {
  type: InputActionKind;
  payload?: {
    value: string;
    validators?: { type: string; val?: number }[];
  };
}

export const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case InputActionKind.CHANGE:
      return {
        ...state,
        isValid: validate(action.payload!.value, action.payload!.validators!),
        value: action.payload!.value,
      };
    case InputActionKind.TOUCH:
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
