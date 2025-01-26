import { useState} from 'react'
import axios from 'axios'
import SingleCountryData from './components/SingleCountryData'

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null);

  

  const searchHandler = (event) => {
    const searchUpdate = event.target.value
    console.log(`https://restcountries.com/v3.1/name/${searchUpdate}`)
    setSearch(searchUpdate)
    if (searchUpdate === "") {
      setCountries([]);
      setError(null);
      return;
    } else {

      /*console.log(searchUpdate)*/
      axios.get(`https://restcountries.com/v3.1/name/${searchUpdate}`)
        .then(response => {
          const recievedCountries = response.data
          if (recievedCountries.length <= 10) {
            setCountries(recievedCountries)
            setError(null)
          } else {
            setError("Too many matches, specify another filter")
          }
        }).catch(() => {
          setError("country not found")
        }
        )
    }

  }

  const showCountry = (country) => {
    console.log(country)
    setCountries([country])
  }

  return (
    <div>
      <SearchCountries search={search} searchHandler={searchHandler} />
      <Countries countries={countries} error={error} search={search} showCountry={showCountry}/>

    </div>
  )
}

const SearchCountries = ({ search, searchHandler }) => {
  return (
    <p>
      find countries
      <input value={search} onChange={searchHandler} />
    </p>
  )
}

const Countries = ({ countries, error, showCountry }) => {
  if (error) return <p>{error}</p>
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.cca3}>{country.name.common} <button onClick={() => showCountry(country)}>show</button></p>
        ))}
      </div>
    )
  }else if(countries.length === 1){
    return <SingleCountryData country={countries[0]}/>
  }else {
    return <p>Please enter a country</p>;
  }
}

export default App
