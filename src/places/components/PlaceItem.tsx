import { Place } from "../../store";
import Card from "../../shared/components/UIElements/Card";

import styles from "./PlaceItem.module.css";
import Button from "../../shared/components/FormElements/Button";

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <li className={styles["place-item"]}>
      <Card className={styles["place-item__content"]}>
        <div className={styles["place-item__image"]}>
          <img src={place.imgUrl} alt={place.title} />
        </div>
        <div className={styles["place-item__info"]}>
          <h2>{place.title}</h2>
          <h3>{place.address}</h3>
          <p>{place.description}</p>
        </div>
        <div className={styles["place-item__actions"]}>
          <Button inverse>VIEW ON MAP</Button>
          <Button to={`/places/${place.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
