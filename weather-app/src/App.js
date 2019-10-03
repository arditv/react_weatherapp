import React from "react";

import Titles from "./Component/Titles";
import Form from "./Component/Form";

import style from "./App.css";
import Hours from "./Component/Hours.js";
import Current from "./Component/Current.js";
import Days from "./Component/Days.js";
//The api key from the the api we are using.
const API_KEY = "";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            description: undefined,
            error: undefined,
            curTime: null,
            hours: undefined,
            showHour: false,
            update: false,
            days: undefined,
        }
    }
//The componentDidMount method is working out the out the current time. This is being stored in the constant curTime.This is called on after a component is mounted. 
//This is used as it is only called once and therefore don't need to worry with it causing an infinite loop.      

    componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }
    
 
    
     getWeather = (e) => {
        e.preventDefault();
        this.setState({
            showHour: false,
            update: true,
        });
        
//setting the state's city and country to the city and country inputted in the search bar.          
        this.setState({
            city: e.target.elements.city.value,
            country: e.target.elements.country.value,
            showHour: true,
        });


    }
    render(){
        return ( 
         //passing of props to the different components. 
            
        <div className="container"> 
    
           
            
            <Form getWeather={this.getWeather}/>
            <Titles curTime={this.state.curTime}
            city={this.state.city} />
            
            <div>
                <Current city={this.state.city} country={this.state.country}/>
            </div>
            <div>
                <Hours city={this.state.city} country={this.state.country}/>
            </div>
            
            <div>
                <Days city={this.state.city} country={this.state.country}/>
            </div>

        </div>
               
        );
    }
}
export default App;

