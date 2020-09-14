import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BiWind } from 'react-icons/bi';
import { WiHumidity } from "react-icons/wi";
import { Card } from 'react-bootstrap';
import { WiDayCloudy, WiDaySunny, WiRain, WiCloud, WiNightAltPartlyCloudy, WiDayCloudyHigh, WiMoonWaningCrescent2 } from 'weather-icons-react';

const useStyles = makeStyles({
    body: {
        marginTop: '5%'
    },
    weatherInfo: {
        width: '24%',
        height: '110%',
        position: 'relative',
        marginLeft: '34%',
        textAlign: 'center',
        justifyContent: 'space-between',
        marginTop: '2%',
        borderWidth: 2,
        borderColor: '#d5d7db',
        borderRadius: 20,
        border: 'solid'
    },
    location: {
        fontFamily: 'Poppins',
        fontSize: '20px'
    },
    temp: {
        fontSize: '35px'
    },
    windIcon: {
        marginRight: '5%',
        width: '22px',
        height: '22px',
        marginTop: '1%',
        alignItems: 'center'
    },
    humidityIcon: {
        marginRight: '9%',
        marginTop: '2%',
        width: '25px',
        height: '25px',
        alignItems: 'center',
    },
    humidity: {
        fontSize: '20px',
        marginRight: '5%'
    },
    wind: {
        fontSize: '20px'
    }
});

const Weather = props => {
    const classes = useStyles();
    const [currTemp, setCurrTemp] = useState(props.tempInfo)
    const [locationName, setLocationName] = useState(props.locationInfo)
    const [wind, setWind] = useState(props.windInfo)
    const [humidity, setHumidity] = useState(props.humidityInfo)
    const [weatherIcon, setWeatherIcon] = useState(props.weatherIconInfo)

    function waitForElement() {
        if (typeof weatherIcon !== "undefined") {
            return (costumeIcon(weatherIcon))
        }
        else {
            setTimeout(waitForElement, 250);
        }
    }

    function toCelsuis(currTemp) {
        var fTemp = currTemp;
        var fToCel = (fTemp - 32) * 5 / 9;
        var message = Math.round(fToCel) + '\xB0';
        return (message);
    }

    function toKMH(wind) {
        return Math.round(wind * 1.61) + 'km/h'
    }

    function costumeIcon(weatherIcon) {
        var weatherStr = JSON.stringify(weatherIcon)
        weatherStr = weatherStr.substring(32, 34)
        if (weatherStr == 31) return (<WiMoonWaningCrescent2 size={40} color='#000' />);
        if (weatherStr == 34) return (<WiDayCloudy size={40} color='#000' />);
        if (weatherStr == 32) return (<WiDaySunny size={40} color='#000' />);
        if (weatherStr == 11) return (<WiRain size={40} color='#000' />);
        if (weatherStr == 26) return (<WiCloud size={40} color='#000' />);
        if (weatherStr == 33 || weatherStr == 27) return (<WiNightAltPartlyCloudy size={40} color='#000' />);
        if (weatherStr == 28) return (<WiDayCloudyHigh size={40} color='#000' />);
    }

    useEffect(() => {
        waitForElement(props.weatherIcon)
    }, [])

    return (
        <div>
            <Card className="text-center">
                <Card.Header></Card.Header>
                <Card.Body className={classes.weatherInfo}>
                    <Card.Title className={classes.location}>{(locationName)}</Card.Title>
                    <Card.Text>
                        <div className={classes.temp}>{toCelsuis(currTemp)} {waitForElement(weatherIcon)}</div>
                        <div className={classes.humidity}><WiHumidity className={classes.humidityIcon} />{(humidity)}</div>
                        <div className={classes.wind}><BiWind className={classes.windIcon} />{toKMH(wind)}</div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Weather;
