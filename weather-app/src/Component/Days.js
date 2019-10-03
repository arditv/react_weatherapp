import React from "react";
import style from "./hours.css";

const API_KEY = "";

class Days extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            days: undefined,
            city: undefined,
            country: undefined,
        }
    }
    
    //componentWillUpdate will be called every time a re-render is required, such as this.setState() is being called. Unlike componentWillMount, we now get access to the next props which will resemble the next city.
    //Once the state gets changed, we will end up in a loop fetching the data. 
    
    async componentWillUpdate(nextProps) {
     //if statemement is checking if the the current city & country is equal to the next given city & country. If it isnt, then the code will run
        if((this.state.city !== this.props.city) && (this.state.country !== this.props.country))
        {
            this.setState({
                city: this.props.city,
                country: this.props.country,
            });
            const country = nextProps.country;
            const city = nextProps.city;
            console.log(city);
            
            //The fetch keyword is calling to the api that is given by the url
            const api_call = await fetch(`http://api.wunderground.com/api/${API_KEY}/forecast10day//q/${country}/${city}.json`);
// the api call is being stored in the data constant.
            const data = await api_call.json();
            console.log(data);
            let forecast = data.forecast.simpleforecast.forecastday;
//the array is then being broken down for the first 12 indexes and the path is being stored in state days. This is then printing out the relevant information below with 'dayz' representing the array index. It is looping through the array.
            let days = forecast.slice(1,10).map((dayz)=>{
                return(
                    <div className="hour">
                      <p>{dayz.date.weekday}</p>
                      <p>{dayz.high.celsius}°C</p>
                      <p>{dayz.low.celsius}°C</p>
                      <img src={dayz.icon_url} alt="image" width="20px" height="20px" />
                      <p>{dayz.conditions}</p>
                    </div>
                )
            });
            this.setState({
                days:days,
                update:false,
            })
    
        }
    }
    
    render(){
        return ( 
            <div className="container">
                <div className="innerContainer">
                {this.state.days}
            </div>
            </div>
        );
    }
}
export default Days;

