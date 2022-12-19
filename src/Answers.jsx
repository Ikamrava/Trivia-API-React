import React from 'react'


function Answers(props) {
  const style = {
    backgroundColor : props.isHeld ? `#59E391` : `white`
    }


  return (

       
        <div
        onClick = {props.clickHandler}
        style = { style}
        >
          
          {props.value}
        
        </div>
     
    
  )
}

export default Answers
