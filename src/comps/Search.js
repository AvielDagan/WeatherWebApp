import React, { useState } from "react";
import Weather from './Weather'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Loader from 'react-loader-spinner'

export default function Search(props) {
    const [address, setAddress] = useState('');
    const [coord, setCoord] = useState({
        lat: null,
        lng: null
    })
    const [isLoading, setIsLoading] = useState(false);


    const [weatherInfo, setWeatherInfo] = useState([])
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoord(latLng)
        var latSend = latLng.lat.toFixed(2)
        var lngSend = latLng.lng.toFixed(2)
        var coordSend = [latSend, lngSend]
        send(coordSend)
    }

    function send(coordSend) {
        setIsLoading(true);
        coordSend = coordSend.toString();
        const url = `http://127.0.0.1:5000/city_weather/${coordSend}`
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('data', data)
            setWeatherInfo(data)
            setIsLoading(false);
        }).catch(err => {
            console.log("Error Reading data " + err);
        });
    }
    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{
                        width: '60%',
                        fontFamily: 'Poppins',
                        marginLeft: '36%'
                    }}>
                        <input style={{ width: '32%' }} {...getInputProps({ placeholder: 'Search any location' })} type="text" class="form-control" id="usr" />
                        <div>
                            {loading ? <div> loading...</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    width: '35%',
                                    backgroundColor: suggestion.active ? "#bbded6" : "#fff"
                                }
                                return <div {...getSuggestionItemProps(suggestion, { style })}> {suggestion.description}</div>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {isLoading ? (<div style={{ marginLeft: '45%' }}><Loader type="ThreeDots" color="#00BFFF" height={40} width={40} /></div>) : (
                <div >
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

        </div>
    );
}



