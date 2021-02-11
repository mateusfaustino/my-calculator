import React from 'react'
import './Display.css'
export default props =>{
   
    const listOfOperations = props.listOfLastOperations
    const lastItemOfArray= listOfOperations.length-1
    
    const lastOperation1 = listOfOperations[lastItemOfArray].firstValue + listOfOperations[lastItemOfArray].operation + listOfOperations[lastItemOfArray].secondValue 
        
    const lastOperation2 = listOfOperations[lastItemOfArray-1].firstValue + listOfOperations[lastItemOfArray-1].operation + listOfOperations[lastItemOfArray-1].secondValue
    const lastResult2 = listOfOperations[lastItemOfArray-1].result

    const lastOperation3 = listOfOperations[lastItemOfArray-2].firstValue + listOfOperations[lastItemOfArray-2].operation + listOfOperations[lastItemOfArray-2].secondValue
    const lastResult3 = listOfOperations[lastItemOfArray-2].result

    const lastOperation4 = listOfOperations[lastItemOfArray-3].firstValue + listOfOperations[lastItemOfArray-3].operation  + listOfOperations[lastItemOfArray-3].secondValue
    const lastResult4 = listOfOperations[lastItemOfArray-3].result
    
    console.log("list", listOfOperations)
   
    return(
        <div className="display-container">
            <div className="last-operation last-operation4">
                <h5>{lastOperation4}</h5>
                <h5>={lastResult4}</h5>
            </div>
            <div className="last-operation last-operation3">
                <h4>{lastOperation3}</h4>
                <h4>={lastResult3}</h4>
            </div>
            <div className="last-operation last-operation2">
                <h3>{lastOperation2}</h3>
                <h3>={lastResult2}</h3>
            </div>
            <div className="last-operation last-operation1">
                <h2>{lastOperation1}</h2>
            </div>
            <div className="topRetangle"></div>
            <div className="display">={props.value}</div>
        </div>    
    )
}
    
    