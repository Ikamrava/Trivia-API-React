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
import { useNavigate } from 'react-router-dom'


function App() {
  const [score,setScore] = useState()
  const [isFinished,setIsFinished] = useState(false)
  const [isStarted,setIsStarted] = useState(false)

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
    
    function checkAnswer(){
      if(!isFinished){
        
        let score = 0
        newData.map(data=>{
          data.allAnswers.map(answer=>{
            if (answer.isHeld && answer.iscorrect){
              score += 1
            }
      
          })
        })
         setScore (score)
         setIsFinished (true)
      
      }else{
        setIsFinished (false)
        window.location.reload(false);
        setIsStarted(false)
        
        
      }
      
     }


     function StartPage (){
      let navigate = useNavigate()
      if(newData){
        return (
        <div className='startWrapper'>
          <h1>Quizzical</h1>
          <p><a href = "">Some description if needed</a></p>

        
        <button className='btn' onClick= {()=>{
          navigate("/quiz")
           setIsStarted(true)
          }}> Start </button>
       </div>


      )

      } 
 
     }
     



  return (
    <Router>
            
      <Routes>
       <Route path='/' element={<StartPage></StartPage>}></Route>
       <Route path='/quiz' element={<Dom/>}></Route>
       <Route path='/result' element={<ResultPage/>}></Route>
      </Routes>

      <div className='footerWrapper'>
      {isStarted && <div >{score>=0 ? `You scored ${score}/5 correct answers` : ``}</div>}
          {isStarted && <button  className = "btn" onClick={checkAnswer}>
              <Link to = {isFinished ? "/" : "/result"}>{isFinished ? "Play again":"Check Answer"}</Link>
          </button>}
      </div>
    </Router>
  )


  
}

export default App

