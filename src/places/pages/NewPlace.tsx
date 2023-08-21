import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import styles from "./PlaceForm.module.css";
import { User, useAddPlaceMutation } from "../../store";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import AuthContext from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const newPlaceInitialState = {
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
};

const NewPlace: React.FC = () => {
  const { state, changeInputHandler } = useForm(newPlaceInitialState);
  const { loggedInUser } = useContext(AuthContext);
  const [addPlace, addPlaceResult] = useAddPlaceMutation();
  const [errorModal, setErrorModal] = useState(addPlaceResult.isError);
  const navigate = useNavigate();

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addPlace({
      title: state.inputs.title.value as string,
      description: state.inputs.description.value as string,
      address: state.inputs.address.value as string,
      creator: (loggedInUser as User).id,
      image: state.inputs.image.value as File,
    });
  };

  useEffect(() => {
    setErrorModal(addPlaceResult.isError);
  }, [addPlaceResult.isError]);

  if (addPlaceResult.isSuccess) navigate(`/${loggedInUser?.id}/places`);

  return (
    <React.Fragment>
      {errorModal && (
        <ErrorModal
          error={(addPlaceResult.error as any).data.message}
          onClear={() => setErrorModal(false)}
        />
      )}
      <form onSubmit={submitFormHandler} className={styles["place-form"]}>
        {addPlaceResult.isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="image"
          onChange={changeInputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!state.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
