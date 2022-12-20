import React from 'react'
import "./answers.css"


function Answers(props) {
  const style = {
    backgroundColor : props.isHeld ? `#D6DBF5` : `white` 
   
    }


  return (

        <div className='answer'
        onClick = {props.clickHandler}
        style = {style || style2 || style3}
        id = {props.id}
        >
          {props.value}
        
        </div>
        
     
    
  )
}

export default Answers
