import React from 'react'
import './Display.css'
export default props =>{
   
    const listOfOperations = props.list
    const lastItemOfArray= listOfOperations.length-1
    
    const lastOperation1 = listOfOperations[lastItemOfArray].firstValue + '+' + listOfOperations[lastItemOfArray].secondValue 
    const lastResult1 = listOfOperations[lastItemOfArray].result
    const lastOperation2 = listOfOperations[lastItemOfArray-1].firstValue + '+' + listOfOperations[lastItemOfArray-1].secondValue
    
    const lastOperation3 = listOfOperations[lastItemOfArray-2].firstValue + '+' + listOfOperations[lastItemOfArray-2].secondValue
    
    const lastOperation4 = listOfOperations[lastItemOfArray-3].firstValue + '+' + listOfOperations[lastItemOfArray-3].secondValue
    console.log("list", listOfOperations)
   
    return(
        <div className="display-container">
            <h4>{lastOperation4}</h4>
            <h3>{lastOperation3}</h3>
            <h2>{lastOperation2}</h2>
            <h1>{lastOperation1}</h1>
            <div className="display">={props.value}</div>
        </div>    
    )
}
    
    