import React from 'react'
import "./answers.css"


function Answers(props) {
  const style = {
    backgroundColor : props.isHeld ? `#59E391` : `white`
    }


  return (

        <div
        onClick = {props.clickHandler}
        style = {style}
        id = {props.id}
        >
          
          {props.value}
        
        </div>
        
     
    
  )
}

export default Answers
