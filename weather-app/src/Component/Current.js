import React from "react";
import style from "./Current.css";

const API_KEY = "";

class Current extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: undefined,
            city: undefined,
            country: undefined,
        }
    }
    
    //componentWillUpdate will be called every time a re-render is required, such as this.setState() is being called. Unlike componentWillMount, we now get access to the next props which will resemble the next city.
    //Once the state gets changed, we will end up in a loop fetching the data.
    
    async componentWillUpdate(nextProps) {
        console.log(this.props.city);
         //if statemement is checking if the the current city & country is equal to the next given city & country. If it isnt, then the code will run
        if((this.state.city !== this.props.city) && (this.state.country !== this.props.country))
        {
            this.setState({
                city: this.props.city,
                country: this.props.country,
            });
            const country = nextProps.country;
            const city = nextProps.city;
            
            //The fetch keyword is calling to the api that is given by the url
            const api_call = await fetch(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${country}/${city}.json`);
 // the api call is being stored in the data constant.
            const data = await api_call.json();
            console.log(data);

            let current = () => {
                return(
                    <div className="current">
                      
                      <h1> {data.current_observation.temp_c}°C</h1>
                      <img src={data.current_observation.icon_url} alt="image" width="70px" height="70px" />
                      <p>Wind Speed (mph):{data.current_observation.wind_mph}</p>
                      <p>Precipitation (inches): {data.current_observation.precip_today_in}</p>
                    </div>
                )
            };
            
            this.setState({
                current:current(),
            })
        
        }
    }
    
    render(){
        return ( 
            <div>
                {this.state.current}
            </div>
        );
    }
}
export default Current;

