import { useState,  useEffect } from 'react'
import './App.css'
import Question from './Question'
import React from 'react'
import {mixAnswers, decodeHTMLEntities } from './utils.js'
import { nanoid } from 'nanoid'
import Answers from './Answers'
import AnswerTwo from './AnswerTwo'
import "./answers.css"
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'


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

const Dom =()=> newData && newData.map(item=>{
  
  return (
    <div key = {nanoid()}>
      <Question
       key = {nanoid()}
       value= {item.question}
       id = {item.id}
        />
        <div key = {nanoid()} className='answerWrapper'>
        {
          
          item.allAnswers.map(answer=>{
            return( 
            <Answers  
            id= {answer.id} 
            key = {nanoid()} 
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

  const ResultPage =()=> newData && newData.map(item=>{
  
    return (
      <div key = {nanoid()}>
        <Question
         key = {nanoid()}
         value= {item.question}
         id = {item.id}
          />
          <div key = {nanoid()} className='answerWrapper'>
          {
            
            item.allAnswers.map(answer=>{
              return( 
              <AnswerTwo  
              id= {answer.id} 
              key = {nanoid()} 
              clickHandler = {()=> clickHandler(answer.id)} 
              value = {answer.value} 
              isHeld = {answer.isHeld}
              iscorrect= {answer.iscorrect}

              />
              
            )
            })
            
          }
          </div >
  
      </div>
  
      )
    
    })







  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dom/>}></Route>
        <Route path='/result' element={<ResultPage/>}></Route>
      </Routes>
     <div>
     <button onClick={checkAnswer}>
      <Link to="/result">Check Answer</Link>

      </button>
    </div>
    </Router>
  )


  
}

export default App

