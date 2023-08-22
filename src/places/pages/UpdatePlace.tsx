import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import { useFetchPlaceQuery, useUpdatePlaceMutation } from "../../store";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import styles from "./PlaceForm.module.css";

const UpdatePlace: React.FC = () => {
  const { placeId } = useParams();
  const { isFetching, data, error } = useFetchPlaceQuery(placeId);
  const [updatePlace, updatePlaceResult] = useUpdatePlaceMutation();
  const [errorModal, setErrorModal] = useState(updatePlaceResult.isError);
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
    },
    isValid: false,
  });
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorModal(updatePlaceResult.isError);
  }, [updatePlaceResult.isError]);

  const updatePlaceHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePlace({
      id: placeId as string,
      title: state.inputs.title.value as string,
      description: state.inputs.description.value as string,
      token: token as string,
    });
  };
  if (updatePlaceResult.isSuccess) navigate(`/${userId}/places`);

  const clearErrorHandler = () => {
    setErrorModal(false);
  };

  let content;
  if (isFetching)
    content = (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  else if (error)
    content = (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  else
    content = (
      <React.Fragment>
        {updatePlaceResult.isLoading && <LoadingSpinner asOverlay />}
        {errorModal && (
          <ErrorModal
            error={
              (
                updatePlaceResult.error as {
                  status: number;
                  data: { message: string };
                }
              ).data.message
            }
            onClear={clearErrorHandler}
          />
        )}
        <form onSubmit={updatePlaceHandler} className={styles["place-form"]}>
          <Input
            id="title"
            label="Title"
            elementType="input"
            type="input"
            onChange={changeInputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorMsg="Please enter a valid title."
            initialValue={data.place.title}
            initialValid={true}
          />
          <Input
            id="description"
            label="Description"
            elementType="textarea"
            onChange={changeInputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMsg="Please enter a valid description (at least 5 characters)"
            initialValue={data.place.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!state.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      </React.Fragment>
    );

  return content;
};

export default UpdatePlace;
