import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import useForm from "../../shared/hooks/form-hook";

export default function NewPlace() {
   const [formState, inputChangeHandler]=useForm({
    title: {
      value : "",
      isValid: false
    },
    description:{
      value: "",
      isValid: false
    },
    address:{
      value:"",
      isValid:false
    }
  }, false)


  function addPlaceHandler(event){
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={addPlaceHandler}>
      <Input id="title" element="input" type="text" label="Title" errorText="Please enter a valid title" validators={[VALIDATOR_REQUIRE()]} onInput={inputChangeHandler} />
      <Input id="description" element="textarea"  label="Description" errorText="Please enter a valid description(At least 5 characters)" validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputChangeHandler} />
      <Input id="address" element="input"  label="Address" errorText="Please enter a valid address" validators={[VALIDATOR_REQUIRE( )]} onInput={inputChangeHandler} />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
}
