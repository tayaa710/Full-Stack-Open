
import { useEffect, useState } from 'react'
import axios from 'axios'
const Weather = ({ country }) => {
    const apiKey = import.meta.env.VITE_SOME_KEY
    const countryCapital = country.capital
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&units=metric&appid=${apiKey}`
    console.log(url)
    const [weatherData, setWeatherData] = useState(null)
    const [iconURL, setIconURL] = useState(null); // Separate state for icon URL


    
    


    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log("recieved the data")
                setWeatherData(response.data)
                const iconId = response.data.weather[0].icon
                setIconURL(`https://openweathermap.org/img/wn/${iconId}@2x.png`)

            })
    },[])

    return (
        
        <div>
            <h2>Weather in {countryCapital}</h2>
            {weatherData ? (
                <>
                    <p>Temperature: {weatherData.main.temp}<sup>o</sup>C</p>
                    {iconURL && <img src={iconURL} alt="Weather Icon" />}
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}

export default Weather