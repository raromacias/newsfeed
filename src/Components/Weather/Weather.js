import { useEffect, useContext } from "react";
import axios from "axios";
import styles from './Weather.module.css'
import AuthContext from "../../store/authContext";


const Weather = () => {

  const {location, token} = useContext(AuthContext)

  // const getData = useCallback(() => {
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_W_API_KEY}`, {
  //         headers: {
  //             authorization: token
  //         }})
  //     .then(res => console.log(res.data))
  //    .catch (error => console.log(error))
  //       },[location])
    

useEffect(() => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: `${location}`},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_W_API_KEY}`,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function(response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

},[location]);
  return (<div className={styles.weathercontainer}>
    <div className={styles.top}>
      <div className={styles.location}>
        <span>Dallas</span>
      </div>
      <div className={styles.temp}>
        <span>60°</span>
      </div>
      <div className={styles.bottom}>
        <div className={styles.feels}>
          <span>65°</span>
          <span>Feels like</span>
        </div>
      </div>
    </div>

  </div>)
}

export default Weather