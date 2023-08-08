import { faker } from "@faker-js/faker";
import Card from "../../shared/components/UIElements/Card";
import { Place } from "../../store";
import PlaceItem from "./PlaceItem";

import styles from "./PlaceList.module.css";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";

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
    id: 2,
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

interface PlaceListProps {
  userId?: number;
}

const PlaceList: React.FC<PlaceListProps> = () => {
  const { userId } = useParams();

  let content;
  if (!places.length)
    content = (
      <div className={`${styles["place-list"]} center`}>
        <Card>
          <h2>No laces found. Maybe create One?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  if (places.length)
    content = places.map((place) => {
      return place.id === +userId! ? (
        <PlaceItem key={place.id} place={place} />
      ) : null;
    });
  return <ul className={styles["place-list"]}>{content}</ul>;
};

export default PlaceList;
