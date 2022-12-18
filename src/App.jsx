import { useState,  useEffect } from 'react'
import './App.css'
import Question from './Question'
import React from 'react'

function App() {
  const [question , setQuestion] = useState([])
  
  
  
  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple";
      
        fetch(url)
        .then(res => res.json())
        .then(data=> {
          setQuestion(data.results)
          
        })
       
      
    
}, []);
   
  console.log(question)
  
  const questions = question.map(item => {
    const correctAnswer = item.correct_answer
   

    return <Question question = {item.question} answers=
    {
      {
        correct : item.correct_answer,
        incorrect0: item.incorrect_answers[0],
        incorrect1: item.incorrect_answers[1],
        incorrect2: item.incorrect_answers[2],

      }
    }
    
    isHeld = {item.isHeld}
    />
  })


  return (
    <div>
      {questions}
    </div>
  )
}

export default App

