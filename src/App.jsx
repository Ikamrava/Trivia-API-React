import { useState,  useEffect } from 'react'
import './App.css'
import Question from './Question'
import React from 'react'
import {mixAnswers, decodeHTMLEntities } from './utils.js'
import { nanoid } from 'nanoid'

function App() {
  const [resultsData,setResultsData] = useState()
  const [question , setQuestion] = useState([])
  const [isHeld, setIsHeld] = useState(false);
  const [correctAnswer,setCorrectAnswer] = useState("")
  const [incorrectAnswers,setIncorrectAnswers] = useState([])
  const[newData,setNewData]= useState()

  function generatingData (results){

    const allAnswers = []
    const id = nanoid()

    results && results.incorrect_answers.map(item=> {
      const incorrectAns = {
        value: decodeHTMLEntities(item),
        id :nanoid(),
        iscorrect:false,
        isHeld:false,
        questionID : id
      }
      allAnswers.push(incorrectAns)

    })

    allAnswers.push({
      value: decodeHTMLEntities(results.correct_answer),
      id :nanoid(),
      iscorrect:true,
      isHeld:false,
      questionID : id
    })


  return {question:decodeHTMLEntities(results.question), id:nanoid(), allAnswers : mixAnswers(allAnswers) }
  }
  
  
  
  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple";
      try {
        fetch(url)
        .then(res => res.json())
        .then(data=> {

          const results = data.results    
          console.log(results)
          const questionsWithAnswers = results.map(result => generatingData(result))
          setNewData(questionsWithAnswers)

        })
      }catch(e){
        console.log(e)

      }
}, []);



function heldHandeler(){
  
  // setQuestion(oldData=> oldData.map(question => {
  //   return question.id === id ? {...dice, isHeld : !dice.isHeld} : dice
  //  }))
  
}
  





  
const dom = newData && newData.map(item=>{
  return (
    <div>
      <Question
       key = {item.id}
       value= {item.question}
       id = {item.id}
       answers = {item.allAnswers}
        />
    </div>)
  
  })







  return (
    <div>
     {dom}
    </div>
  )


  
}

export default App

