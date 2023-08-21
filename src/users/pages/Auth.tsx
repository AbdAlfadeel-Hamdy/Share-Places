import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";

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
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      let response;
      if (!isLoginMode) {
        const formData = new FormData();
        formData.append("name", state.inputs.name.value as string);
        formData.append("email", state.inputs.email.value as string);
        formData.append("password", state.inputs.password.value as string);
        formData.append("image", state.inputs.image.value as File);

        response = await axios.post("/users/signup", formData, {
          baseURL: process.env.REACT_APP_BASE_URL,
          withCredentials: true,
        });
      } else {
        response = await axios.post(
          "/users/login",
          {
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          },
          {
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true,
          }
        );
      }
      setIsLoading(false);
      const { user } = response.data;
      login(user);
    } catch (err: Error | AxiosError | unknown) {
      setIsLoading(false);
      if (axios.isAxiosError(err))
        setError(err.response?.data.message || "Something went wrong!");
      else if (err instanceof Error)
        setError(err.message || "Something went wrong!");
    }
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  return (
    <Card className={styles.authentication}>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearErrorHandler} />}
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
        {!isLoginMode && (
          <ImageUpload
            id="image"
            center
            onChange={changeInputHandler}
            errorText="Please provide an image."
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
          errorMsg="Please enter a valid password (at least 6 characters)."
          validators={[VALIDATOR_MINLENGTH(6)]}
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
