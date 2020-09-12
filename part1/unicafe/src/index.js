import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleChange}>
      {props.text}
    </button>
  )
}

// Component for displaying individual properties (good, bad, neutrl)

const DisplayIndividualSats = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.count}</td>
    </tr>
  )
}

// Component for displaying average

const DisplayAverage = ({ good, neutral, bad }) => {
  const average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  return (
    <tr>
      <td>average</td>
      <td> {average}</td>
    </tr>
  )

}

const DisplayPositiveAverage = ({ good, neutral, bad }) => {
  const positiveAverage = (good / (good + neutral + bad)) * 100
  return (
    <tr>
      <td>positive</td>
      <td> {positiveAverage} %</td>
    </tr>
  )
}

// Component for displaying stats conditionally

const ConditionalDisplay = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <DisplayIndividualSats text={'good'} count={good} />
        <DisplayIndividualSats text={'neutral'} count={neutral} />
        <DisplayIndividualSats text={'bad'} count={bad} />
        <DisplayAverage good={good} neutral={neutral} bad={bad} />
        <DisplayPositiveAverage good={good} neutral={neutral} bad={bad} />
      </table>
    )
  }
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const positive = () => setGood(good + 1)
  const neutralFB = () => setNeutral(neutral + 1)
  const negative = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleChange={positive} />
      <Button text={'neutral'} handleChange={neutralFB} />
      <Button text={'bad'} handleChange={negative} />
      <h2>statistics</h2>
      <ConditionalDisplay good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)