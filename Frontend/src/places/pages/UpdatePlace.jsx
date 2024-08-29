import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import { useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let currentPlace = null;
  for (let place of DUMMY_PLACES) {
    if (place.id === placeId) {
      currentPlace = place;
      break;
    }
  }

  useEffect(() => {
    if (currentPlace) {
      setFormData(
        {
          title: {
            value: currentPlace.title,
            isValid: true,
          },
          description: {
            value: currentPlace.description,
            isValid: true,
          },
        },
        true
      );

      setIsLoading(false);
    }
  }, [setFormData, currentPlace]);

  function updatePlaceHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place.</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updatePlaceHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={inputChangeHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Please enter a valid description(At least 5 characters)"
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputChangeHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
