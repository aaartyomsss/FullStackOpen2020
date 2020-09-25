import React from 'react'

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = ({ parts }) => {

    return (
        <div>

            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ array }) => {
    const sum = array.reduce((total, current) => total + current.exercises, 0)
    return (
        <div>
            <p>Number of exercises {sum} </p>
        </div>
    )
}

const Course = (props) => {

    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total array={props.course.parts} />
        </div>
    )
}

export default Course
  