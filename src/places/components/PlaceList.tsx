import { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import { Place, useFetchPlacesQuery } from "../../store";
import PlaceItem from "./PlaceItem";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import styles from "./PlaceList.module.css";

interface PlaceListProps {
  userId?: number;
}

const PlaceList: React.FC<PlaceListProps> = () => {
  const { userId } = useParams();
  const { isFetching, data, error, isError } = useFetchPlacesQuery(userId);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(isError);

  let content;
  if (isFetching)
    content = (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  else if (error)
    content = content = (
      <>
        {errorModalIsOpen && (
          <ErrorModal
            error={
              (error as { status: number; data: { message: string } }).data
                .message
            }
            onClear={() => setErrorModalIsOpen(false)}
          />
        )}
      </>
    );
  else if (!data || !data.places.length)
    content = (
      <div className={`${styles["place-list"]} center`}>
        <Card>
          <h2>No laces found. Maybe create One?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  else
    content = data.places.map((place: Place) => {
      return <PlaceItem key={place.id} place={place} />;
    });
  return <ul className={styles["place-list"]}>{content}</ul>;
};

export default PlaceList;
