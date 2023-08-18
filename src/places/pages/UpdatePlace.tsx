import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import { faker } from "@faker-js/faker";
import { Place } from "../../store";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import useForm from "../../shared/hooks/form-hook";
import styles from "./PlaceForm.module.css";
import Card from "../../shared/components/UIElements/Card";

const places: Place[] = [
  {
    id: "1",
    title: faker.word.noun(),
    image: faker.image.avatar(),
    address: faker.location.country(),
    description: faker.animal.bird(),
    creator: "5",
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  },
  {
    id: "2",
    title: faker.word.noun(),
    image: faker.image.avatar(),
    address: faker.location.country(),
    description: faker.animal.bird(),
    creator: "faker.number.int()",
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  },
];

const UpdatePlace: React.FC = () => {
  const { placeId } = useParams();
  const [isLaoding, setIsLoading] = useState(true);

  const { state, changeInputHandler, setFormData } = useForm({
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

  let foundPlace: Place | undefined;
  if (placeId) foundPlace = places.find((place) => place.id === placeId);

  useEffect(() => {
    if (foundPlace)
      setFormData({
        inputs: {
          title: {
            value: foundPlace.title,
            isValid: true,
          },
          description: {
            value: foundPlace.description,
            isValid: true,
          },
        },
        isValid: true,
      });
    setIsLoading(false);
  }, [setFormData, foundPlace]);

  if (!foundPlace || isLaoding)
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );

  return (
    <form className={styles["place-form"]}>
      <Input
        id="title"
        label="Title"
        elementType="input"
        type="input"
        onChange={changeInputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid title."
        initialValue={state.inputs.title.value}
        initialValid={state.inputs.title.isValid}
      />
      <Input
        id="description"
        label="Description"
        elementType="textarea"
        onChange={changeInputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMsg="Please enter a valid description (at least 5 characters)"
        initialValue={state.inputs.description.value}
        initialValid={state.inputs.description.isValid}
      />
      <Button type="submit" disabled={!state.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
