import { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import styles from "./Auth.module.css";
import AuthContext from "../../shared/context/auth-context";

const Auth: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { state, changeInputHandler, setFormData } = useForm({
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        inputs: {
          email: state.inputs.email,
          password: state.inputs.password,
        },
        isValid: state.inputs.email.isValid && state.inputs.password.isValid,
      });
    } else {
      setFormData({
        inputs: state.inputs,
        isValid: false,
      });
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state.inputs);
    login();
  };

  return (
    <Card className={styles.authentication}>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={submitFormHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            label="Your Name"
            elementType="input"
            type="text"
            onChange={changeInputHandler}
            errorMsg="Please enter your name."
            validators={[VALIDATOR_REQUIRE()]}
          />
        )}
        <Input
          id="email"
          label="E-Mail"
          elementType="input"
          type="email"
          onChange={changeInputHandler}
          errorMsg="Please enter a valid email address."
          validators={[VALIDATOR_EMAIL()]}
        />
        <Input
          id="password"
          label="Password"
          elementType="input"
          type="password"
          onChange={changeInputHandler}
          errorMsg="Please enter a valid password (at least 8 characters)."
          validators={[VALIDATOR_MINLENGTH(8)]}
        />
        <Button type="submit" disabled={!state.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
