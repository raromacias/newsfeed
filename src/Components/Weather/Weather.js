import { useEffect, useContext, useCallback , useState} from "react";
import axios from "axios";
import styles from './Weather.module.css'
import AuthContext from "../../store/authContext";


const Weather = () => {
  const [data, setData] = useState({})
  const {location} = useContext(AuthContext)

  const getData = useCallback(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_W_API_KEY}`
          )
      .then(res => {
        setData(res.data)
        console.log(res.data)})
     .catch (error => console.log(error))
        },[location])
 useEffect(() => {
  getData()
 }, [getData])   



  return (<div className={styles.weathercontainer}>
    <div className={styles.capsule}>
      <div className={styles.text}>
        <span>{data.name}</span>
      </div>
      <div className={styles.text}>
        {data.main ? <span>{data.main.temp.toFixed()}°F</span> : null}
      </div>
      <div className={styles.capsule}>
        <div className={styles.feels}>
        <span>Feels like</span><br/>
          {data.main ? <span>{data.main.feels_like.toFixed()}°F</span> : null}
       </div>
      </div>
    </div>

  </div>)
}

export default Weather