import React from 'react'
import ReactDOM from 'react-dom';
import './Button.css'

export default props =>{
    let classes ='button '
    classes += props.buttonClass == 'operation' ? 'operation ' : ""
    classes += props.buttonClass == 'orange-label' ? 'orange-label ' : ""
    classes += props.buttonClass == 'number' ? 'number ' : ""
    classes += props.buttonClass == 'percentage' ? 'percentage ' : ""
    classes += props.buttonClass == 'equal' ? 'equal ' : ""
    
    return(
        <button onClick={e=>props.click && props.click(props.label)}
        
        
         className={classes} >

            {props.label}
        </button>
    )
}
    