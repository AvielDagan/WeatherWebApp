import React, { useState, useEffect } from "react";
import './App.css';
import 'typeface-poppins';
import Header from './comps/Header';
import { makeStyles } from "@material-ui/styles";
import 'typeface-poppins';
import Weather from './comps/Weather'
import Search from './comps/Search'
import Loader from 'react-loader-spinner'

const useStyles = makeStyles({
  body: {
    height: '100%'
  }
});

const App = props => {
  const classes = useStyles();
  const [weatherInfo, setWeatherInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:5000/get_deafult_weather', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setWeatherInfo(data)
      setIsLoading(false);
    }).catch(err => {
      console.log("Error Reading data " + err);
    });
  }, [])

  return (
    <div className={classes.body}>
      <Header />
      <Search />
      {isLoading ? (<div style={{ marginLeft: '45%' }}><Loader type="ThreeDots" color="#00BFFF" height={40} width={40} /></div>) : (
        <div>
          {weatherInfo.map((item) => {
            let locationInfo = item.locationName
            let tempInfo = item.currTemp.substring(0, 2)
            let windInfo = item.wind.substring(0, 2)
            let humidityInfo = item.humidity
            let weatherIconInfo = item.weatherIcon
            return (
              <Weather
                locationInfo={locationInfo}
                tempInfo={tempInfo}
                windInfo={windInfo}
                humidityInfo={humidityInfo}
                weatherIconInfo={weatherIconInfo}
              />
            )
          })}
        </div>
      )}

      <div style={{ marginTop: '3%' }}></div>
    </div>
  );
}

export default App;
