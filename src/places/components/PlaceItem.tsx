import React, { useState } from "react";

import { Place } from "../../store";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "./Map";

import styles from "./PlaceItem.module.css";

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const [showMap, setShowMap] = useState(false);
  const showMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onClick={closeMapHandler}
        header={place.address}
        contentClass={styles["place-item__modal-content"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        footerClass={styles["place-item__modal-actions"]}
      >
        <div className={styles["map-container"]}>
          <Map coordinates={place.location} zoom={7} />
        </div>
      </Modal>
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
            <Button inverse onClick={showMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${place.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
