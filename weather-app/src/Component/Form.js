import React from "react";
import style from "./Form.css";

const Form = props => (
    <div className= "FormBar">
        <form onSubmit={props.getWeather}>

            <input type="text" name="city" placeholder="City..."/>

            <input type="text" name="country" placeholder="Country.."/>

            <button> Search </button>

        </form>

    </div>
);

export default Form;