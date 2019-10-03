import React from "react";
import style from "./hours.css";

const API_KEY = "";

class Hours extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hours: undefined,
            city: undefined,
            country: undefined,
        }
    }
    
    //componentWillUpdate will be called every time a re-render is required, such as this.setState() is being called. Unlike componentWillMount, we now get access to the next props which will resemble the next city.
    //Once the state gets changed, we will end up in a loop fetching the data.
    
    async componentWillUpdate(nextProps) {
//if statemement is checking if the the current city & country is equal to the next given city & country. If it isnt, then the code will run.  
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
            const api_call = await fetch(`http://api.wunderground.com/api/${API_KEY}/hourly/q/${country}/${city}.json`);
// the api call is being stored in the data constant.
            const data = await api_call.json();
            console.log(data);
            //foreacast is recieving the path to the hourly forecast within the api script?
            
            let forecast = data.hourly_forecast;
 //the array is then being broken down for the first 12 indexes and the path is being stored in state hours. This is then printing out the relevant information below with 'hour' representing the array index. It is looping through the array.
            let hours = forecast.slice(0,12).map((hour)=>{
                return(
                    <div className="hour">
                      <p>{hour.FCTTIME.civil}</p>
                      <p>{hour.temp.metric}°C</p>
                      <img src={hour.icon_url} alt="image" width="20px" height="20px" />
                      <p className="condition">{hour.condition}</p>
                    </div>
                )
            });
            this.setState({
                hours:hours,
                update:false,
            })
        
        }
    }
    
    render(){
        return ( 
            <div className="container">
                <div className="innerContainer">
                    {this.state.hours}
                </div>
            </div>
        );
    }
}
export default Hours;

