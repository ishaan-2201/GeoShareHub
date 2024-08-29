import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import { useContext, useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

export default function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function deletionWarningHandler() {
    setShowConfirmModal(true);
  }
  function cancelDeleteHandler() {
    setShowConfirmModal(false);
  }
  function confirmDeleteHandler() {
    setShowConfirmModal(false);
    console.log("DELETING...");
  }
  function openMapHandler() {
    setShowMap(true);
  }
  function closeMapHandler() {
    setShowMap(false);
  }
  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
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
      >
        <p>Do you want to delete this place? This action cannot be undone</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={deletionWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
