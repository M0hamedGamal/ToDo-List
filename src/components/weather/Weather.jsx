import React, {useEffect, useState} from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

function Weather(props) {
    const APIKey = '73da34b48b6d6b59b5b36b9a32870cb2'
    const [country, setCountry] = useState('')
    const [weather, setWeather] = useState('')
    useEffect(() => {
    }, [])

    const getWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}`).then((res) => {
            setWeather(res.data)
        })
        axios.get(`api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${APIKey}`).then((response) => {
            console.log(response)
        })

    }
    return (
        <div className='todo-weather'>
            <Typography className='todo-weather-title' variant="h4" gutterBottom>Weather</Typography>
            <div className='todo-weather-container'>
                <TextField label="Country" variant="standard" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                <Button className='todo-weather-container-btn' variant="contained" onClick={getWeather}>Get Weather</Button>
            </div>
            {weather.main && <>
                <Typography className='todo-weather-container-data' variant="h5"
                            gutterBottom>{weather.name}</Typography>
                <Typography className='todo-weather-container-data' variant="h5"
                            gutterBottom>{weather?.main?.temp}°C</Typography>
                <Typography className='todo-weather-container-data' variant="h5"
                            gutterBottom>{weather?.weather[0]?.main}</Typography>
                <Typography className='todo-weather-container-data' variant="h5"
                            gutterBottom>{weather?.weather[0]?.description}</Typography>
            </>
            }
        </div>
    );
}

export default Weather;