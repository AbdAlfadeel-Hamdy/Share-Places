import { User } from "../../store";
import { faker } from "@faker-js/faker";
import PlaceList from "../components/PlaceList";

const user: User = {
  id: 1,
  name: "gonzalo",
  image: faker.image.avatar(),
  placeCount: 4,
};

const UserPlaces: React.FC = () => {
  return <PlaceList />;
};

export default UserPlaces;
