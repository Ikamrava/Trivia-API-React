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


function clickHandler(id){
  setAnswers(oldanswers=> oldanswers.map(answer => {
    return answer.id === id ? {...answer, isHeld : !answer.isHeld} : answer
   }))
}
       
 
 const dom = props &&  answers.map(answer=>{
  
    return (
    
     <Answers  id= {answer.id} key = {nanoid} clickHandler = {()=>clickHandler(answer.id)} value = {answer.value} isHeld = {answer.isHeld}/>

    )
  })

    
  return (
    <div>
      <h3>{`${props.value.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}`}</h3>
      <div className="answerWrapper">
      {dom}
    </div>
    </div>
  )
}

export default Question
