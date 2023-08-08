import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const { state, changeInputHandler } = useForm({
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

  return (
    <Card className={styles.authentication}>
      <h2>Login Required</h2>
      <hr />
      <form>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
