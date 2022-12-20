import React from 'react'
import "./answers.css"

function AnswerTwo(props) {

    const style = {
        backgroundColor :  
                        props.iscorrect ? `#94D7A2` : `white`&&
                        props.isHeld ? `#F8BCBC` : `white`,
        opacity:  !props.iscorrect ? "0.5" : "1"
        }
    
    
      return (
    
            <div className='answer'
            onClick = {props.clickHandler}
            style = {style}
            id = {props.id}
            >
              {props.value}
            
            </div>
            
         
        
      )
  
}

export default AnswerTwo
