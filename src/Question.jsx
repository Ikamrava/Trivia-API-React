import React, { useState } from 'react'
import "./question.css"
import Answers from './Answers';
import "./answers.css"
import {nanoid} from "react"


function Question(props) {
 const [answers,setAnswers] = useState(props.answers)

  const entities = {
  '&#039;': "'",
  '&quot;': '"',
  
};

  return (
    <div>
      <h3>{props.value}</h3>
    </div>
  )
}

export default Question
