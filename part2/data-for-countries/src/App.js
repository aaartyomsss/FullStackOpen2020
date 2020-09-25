import React, { useState , useEffect }  from 'react';
import axios from 'axios'

const SearchField = ({text, value, onChange}) => {
  return (
    <div>
      {text} <input type="text" value={value} onChange={onChange}/>
    </div>
  )
}



const DisplayWeather = ({api, name}) => {
  
  const [weather, setWeather] = useState([])

  useEffect(()=> {

    const params = {
      access_key: api,
      query: name
    } 

    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      setWeather(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }, [])

    

  if (weather.current === undefined) {
    return (
      <div>Getting data</div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt="weather"/>
        <p>humidity: {weather.current.humidity}%</p>
      </div>
    )
  }


}

// TODO Display only one country after clicking the button

const DisplaySingleCountry = ({obj, languagesArray, displayAll, buttonFunc, api}) => {

  obj.displayAll = displayAll
  console.log(obj)

  if(obj.displayAll === true) {
    return (
      <div>
        <h1>{obj.name}</h1> <ShowInfoButton text={displayAll ? "hide" : "show"} onClick={buttonFunc}/>
        <p>capital {obj.capital}</p>
        <p>population {obj.population}</p>
        <h2>Languages</h2>
        <ul>{languagesArray.map((obj, i) => <li key={i}>{obj.name}</li>)}</ul>
        <h2>Country flag</h2>
        <img src={obj.flag} style={{"width":"300px"} } alt="coutryFlag"/>
        <DisplayWeather name={obj.name} api={api}/>
      </div>)
  } else {
    return (
      <div>
        {obj.name} <ShowInfoButton text={displayAll ? "hide" : "show"} onClick={buttonFunc}/>
      </div>
    )
  }
}

const ShowInfoButton = ({onClick, text}) => {
  return (
    <div>
      <input onClick={onClick} value={text} type={"button"}/>
    </div>
  )
}

const DisplayInfo = ({array, filter, displayAddInfo, onChangeButton, api}) => {
  
  // Filtering logic

  const filteredCountries = array.filter(obj => {
    const dummy = obj.name.toLowerCase()
    return dummy.includes(filter.toLowerCase())
  })
  
  filteredCountries.forEach(o => o.displayAll = false)

  // Conditional display block
  
  if (filter === '') {
    return (
      <div>
        Please, search for the countries!
      </div>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter!
      </div>
    )
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((obj, i) => <li key={i}><DisplaySingleCountry obj={obj} languagesArray={obj.languages} displayAll={displayAddInfo} buttonFunc={()=>onChangeButton(i)}/></li>)}
      </ul>
    )
  } else if (filteredCountries.length === 1) {
    const obj = filteredCountries[0]
    const languagesArray = obj.languages
    
    return (
      <DisplaySingleCountry obj={obj} languagesArray={languagesArray} displayAll={true} api={api}/>
    )
  } else {
    return (
      <div>Such country doesn't exist</div>
    )
  }
}

function App() {
  const [inputValue, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [showInfo, setInfo] = useState(false)

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })


    
  }, [])

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const showAll = (id) => {
    console.log(id)
    setInfo(!showInfo)
  }

  const api_key = process.env.REACT_APP_API_KEY

  

  return (
    <div>
      <SearchField text={"Find countries"} value={inputValue} onChange={handleChange}/>
      <DisplayInfo array={countries} filter={inputValue} displayAddInfo={showInfo} onChangeButton={showAll} api={api_key}/>
    </div>)
}

export default App;
