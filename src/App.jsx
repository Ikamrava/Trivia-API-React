import { useState,  useEffect } from 'react'
import './App.css'
import Question from './Question'
import React from 'react'
import {mixAnswers, decodeHTMLEntities } from './utils.js'
import { nanoid } from 'nanoid'
import Answers from './Answers'
import "./answers.css"

function App() {
  const [answers,setAnswers] = useState()

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
          const questionsWithAnswers = results.map(result => generatingData(result))
          setNewData(questionsWithAnswers)
          

        })
      }catch(e){
        console.log(e)

      }
}, []);





function checkIsHeld(allAnswers){
   return allAnswers.isHeld === false
}



function clickHandler(id){
  setNewData(oldData=> oldData.map(data=> {
    if(data.allAnswers.every(checkIsHeld)){
      
      const newAnswer = data.allAnswers.map(answer => {
         if(answer.id === id){
            const test = {...answer, isHeld : !answer.isHeld}
            return test
         }
         return answer
         
       })
       
       return {...data , allAnswers : newAnswer}
     }else{
      
      console.log("please deslect the previus choise")

      const newAnswer = data.allAnswers.map(answer => {
        if(answer.id === id){
          return {...answer, isHeld : false}
        }
        return answer
      })
      return {...data, allAnswers : newAnswer}

      }

    }))
  
 }

 function checkAnswer(){
  let score = 0
  newData.map(data=>{
    data.allAnswers.map(answer=>{
      if (answer.isHeld && answer.iscorrect){
        score += 1
      }

    })
  })
  console.log(score)
 }

 console.log(newData)
 
const dom = newData && newData.map(item=>{
  
  return (
    <div>
      <Question
       key = {item.id}
       value= {item.question}
       id = {item.id}
        />
        <div className='answerWrapper'>
        {
          
          item.allAnswers.map(answer=>{
            return( 
            <Answers  
            id= {answer.id} 
            key = {answer.id} 
            clickHandler = {()=> clickHandler(answer.id)} 
            value = {answer.value} 
            isHeld = {answer.isHeld}/>
            
          )
          })
          
        }
        </div>

    </div>

    )
  
  })








  return (
    <div>
     {dom}
     <button onClick={checkAnswer}>Check Answer</button>
    </div>
  )


  
}

export default App

