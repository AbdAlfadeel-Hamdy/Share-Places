import React, { useContext, useState, useEffect } from 'react';

import { Place, useDeletePlaceMutation } from '../../store';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Map from './Map';
import AuthContext from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import styles from './PlaceItem.module.css';

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { userId, token } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowDeleteModal] = useState(false);
  const [deletePlace, deletePlaceResult] = useDeletePlaceMutation();
  const [errorModal, setErrorModal] = useState(deletePlaceResult.isError);

  useEffect(() => {
    setErrorModal(deletePlaceResult.isError);
  }, [deletePlaceResult.isError]);

  const showMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowDeleteModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowDeleteModal(false);
    await deletePlace({ placeId: place.id, token: token as string });
  };

  return (
    <React.Fragment>
      {deletePlaceResult.isLoading && <LoadingSpinner asOverlay />}
      {errorModal && (
        <ErrorModal
          error={(deletePlaceResult.error as any).data.message}
          onClear={() => setErrorModal(false)}
        />
      )}
      <Modal
        show={showMap}
        onClose={closeMapHandler}
        header={place.address}
        contentClass={styles['place-item__modal-content']}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        footerClass={styles['place-item__modal-actions']}
      >
        <div className={styles['map-container']}>
          <Map coordinates={place.location} zoom={7} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onClose={cancelDeleteHandler}
        header={'Are you sure?'}
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
        footerClass={styles['place-item__modal-actions']}
      >
        Do you want to proceed and delete this place? Please note that it can't
        be undone thereafter.
      </Modal>
      <li className={styles['place-item']}>
        <Card className={styles['place-item__content']}>
          <div className={styles['place-item__image']}>
            <img
              src={`${process.env.REACT_APP_BASE_URL?.slice(0, -7)}/${
                place.image
              }`}
              alt={place.title}
            />
          </div>
          <div className={styles['place-item__info']}>
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className={styles['place-item__actions']}>
            <Button inverse onClick={showMapHandler}>
              VIEW ON MAP
            </Button>
            {userId === place.creator && (
              <Button to={`/places/${place.id}`}>EDIT</Button>
            )}
            {userId === place.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
