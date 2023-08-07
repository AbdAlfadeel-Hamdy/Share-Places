import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import { faker } from "@faker-js/faker";
import { Place } from "../../store";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const places: Place[] = [
  {
    id: 1,
    title: faker.word.noun(),
    imgUrl: faker.image.avatar(),
    address: faker.location.country(),
    description: faker.animal.bird(),
    creator: faker.number.int(),
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  },
  {
    id: 1,
    title: faker.word.noun(),
    imgUrl: faker.image.avatar(),
    address: faker.location.country(),
    description: faker.animal.bird(),
    creator: faker.number.int(),
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  },
];

const UpdatePlace: React.FC = () => {
  const { placeId } = useParams();

  let foundPlace: Place | undefined;
  if (placeId) foundPlace = places.find((place) => place.id === +placeId);

  if (!foundPlace)
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );

  return (
    <form>
      <Input
        id="title"
        label="Title"
        elementType="input"
        type="input"
        onChange={() => {}}
        validators={[VALIDATOR_REQUIRE()]}
        errorMsg="Please enter a valid title."
        value={foundPlace.title}
        valid={true}
      />
      <Input
        id="description"
        label="Description"
        elementType="textarea"
        onChange={() => {}}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMsg="Please enter a valid description (at least 5 characters)."
        value={foundPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={false}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
