import { useEffect, useState } from "react";
import axios from "axios";


const Weather = () => {
  const [location, setLocation] = useState('')

  const getData = async () => {
    try {
      
        await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=${process.env.REACT_APP_W_API_KEY}&contentType=json`)
      .then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error)
    }
};
useEffect(() => {
getData();
},[]);
  return (<div>Weather</div>)
};

export default Weather;