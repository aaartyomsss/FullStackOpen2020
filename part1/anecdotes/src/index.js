import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const ButtonNext = ({handleClick, text}) => {
  return(
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
  )
}

const DisplayVotes = ({votes}) => {
  return (
    <div>has {votes} votes</div>
  )
}

const ButtonVote = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Upvoted = ({array}) => {
    const copy = [...array]
    const sorted = copy.sort((a, b) => b-a)
    const display = array.indexOf(sorted[0])
    const joke = anecdotes[display]
    return (
      <p>{joke}</p>
    )
}
 
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState([0, 0, 0, 0, 0, 0])
  
  //Function for random numbers
  const random = () => {
    const currentNumber = Math.floor(Math.random()*((anecdotes.length - 1)-0+1)+0)
    setSelected(currentNumber)
  }

  // Function for voting
  const vote = () => {
    const copy = [...points]

    copy[selected] += 1

    setPoint(copy)
  }
 
  return (
    <div>
      <h1>Anectode of the day</h1>
      {props.anecdotes[selected]}
      <DisplayVotes votes={points[selected]} />
      <ButtonNext handleClick={random} text={'next anecdote'}/>
      <ButtonVote handleClick={vote} text={'vote'}/>
      <h2>Anecdote with most votes</h2>
      <Upvoted array={points}/>
    </div>
  )
}





const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)