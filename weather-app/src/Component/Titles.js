import React from "react";

const Titles = props => (
    <div>
        <h1> {props.curTime}</h1>
        <p> 
            <h2>{props.city}</h2> 
        </p>
            
        </div>
);

export default Titles;