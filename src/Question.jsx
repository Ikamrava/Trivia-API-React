import React from 'react'
import "./question.css"



const entities = {
  '&#039;': "'",
  '&quot;': '"',
  
};


function Question(props) {
  const style = {
    backGroundColor : props.isHeld ? `#59E391` : `white`
  }
    let nums = new Set();
        while (nums.size < 4) {
            nums.add(Math.floor(Math.random() * (4) ));
        }
        const randomNumbers = Array.from(nums) ;
        console.log(randomNumbers)

  let answers = [props.answers.correct,props.answers.incorrect0,props.answers.incorrect1,props.answers.incorrect2]
 


  return (
    <div>
      <h3>{`${props.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}`}</h3>
      { <div className="answerWrapper">
        <p>{`${answers[randomNumbers[0]]}`}</p>
        <p>{`${answers[randomNumbers[1]]}`}</p>
        <p>{`${answers[randomNumbers[2]]}`}</p>
        <p>{`${answers[randomNumbers[3]]}`}</p>
      </div> }
    </div>
  )
}

export default Question
