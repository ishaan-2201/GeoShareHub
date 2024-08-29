import { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UIElements/Card";
import useForm from "../../shared/hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

export default function Auth(){
    const auth=useContext(AuthContext);
    const [formState, inputChangeHandler, setFormData]=useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)

    const [isLoginMode,setIsLoginMode]=useState(true);

    function switchModeHandler(){
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevIsLoginMode => !prevIsLoginMode);
    }

    function authHandler(event){
           event.preventDefault()
           console.log(formState.inputs);
           auth.login();
    }

    return <Card className="authentication"> 
         <h2>{isLoginMode? "Login": "Sign Up"} Required!</h2>
         <hr />
        <form onSubmit={authHandler}>
        {!isLoginMode && <Input id="name" element="input" type="text" label="Your Name" errorText="Please enter a name" validators={[VALIDATOR_REQUIRE()]} onInput={inputChangeHandler} />}    
        <Input id="email" element="input" type="email" label="Email" errorText="Please enter a valid email." validators={[VALIDATOR_EMAIL()]} onInput={inputChangeHandler} />
        <Input id="password" element="input" type="password" label="Password" errorText="Please enter a valid password" validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputChangeHandler} />
        <Button type="submit" disabled={!formState.isValid}>{isLoginMode?"LOGIN": "SIGN UP"}</Button>
    </form>
      <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode? "Sign Up": "Login"}</Button>
    </Card>
}