import Weather from "./weather"

const SingleCountryData = ({country}) => {
    const flagStyle = {
        width: 200
    }

    const countryName = country.name.common
    const countryCapital = country.capital
    


    return (
        <div>
            <h1>{countryName}</h1>
            <p>Capital: {countryCapital}</p>
            <p>Area: {country.area} km<sup>2</sup></p>
            <div>
                <p>Languages:</p>
                <ul>
                    {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
                </ul>
            </div>
            <img src={country.flags.svg} alt={country.flags.alt || `Flag of ${countryName}`} style={flagStyle} />
            <div>
                
                <Weather country={country}/>
            </div>
        </div>
    )
}

export default SingleCountryData