import { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

function reducer(state,action){
     switch(action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case "TOUCH":
            return {
                ...state,
                isTouched:true
            }    
     }
}

export default function Input(props) {
    const [inputState,dispatch]=useReducer(reducer,{value: props.initialValue || "", isValid: props.initialValid || false, isTouched: false})
    const {onInput, id}=props;
    const {value,isValid}=inputState;

    useEffect(()=>{
        onInput(id,value,isValid);
    },[id,value,isValid,onInput])

    function handleChange(event){
        dispatch({type: "CHANGE", val: event.target.value, validators: props.validators})
    }
    function handleTouch(){
        dispatch({type:"TOUCH"})
    }
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={handleChange} value={inputState.value} onBlur={handleTouch} />
    ) : (
      <textarea id={props.id} onChange={handleChange} value={inputState.value} onBlur={handleTouch} />
    );
  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
