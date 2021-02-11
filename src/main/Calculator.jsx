import React, {Component} from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
import lightThemeIcon from "../assets/theme-button-icon.svg"
import darkThemeIcon from "../assets/theme-button-icon-dark.svg"
import lightCIcon from "../assets/c.svg"
import darkCIcon from "../assets/c-dark.svg"
import lightDeleteIcon from "../assets/delete-icon.svg"
import darkDeleteIcon from "../assets/delete-icon-dark.svg"

const initialState = {
    displayValue:'0',
    clearDisplay:false,
    operation:null,
    values:[0,0],
    currentValue:0,
    darkTheme:false,
    history:[
        {firstValue:'', secondValue:'', operation:'', result:''},
        {firstValue:'', secondValue:'', operation:'', result:''},
        {firstValue:'', secondValue:'', operation:'', result:''},
        {firstValue:'', secondValue:'', operation:'', result:''}
    ]
    
}
function convertValueToString (valueForBeConvertedToString) {
        const convertedValue = String(valueForBeConvertedToString)
        return convertedValue
}
function truncateString(valueForBeTruncated, numberOfDigits) {
    if (typeof valueForBeTruncated != 'string'){
        valueForBeTruncated = convertValueToString(valueForBeTruncated)
    }
    const truncatedString = valueForBeTruncated.slice(0,numberOfDigits)
    return truncatedString;
}    
export default class Calculator extends Component{
    state = {...initialState}
    setTheme(){
        if (this.state.darkTheme==true){
            this.setState({darkTheme:false})
        }else{
            this.setState({darkTheme:true})
        }
    }
    clearDisplayMemory(){
        this.setState({displayValue:"0"})
    }
    clearSecondValueMemory(){
        const currentValue = [...this.state.values]
        currentValue[1]=0
        this.setState({values:currentValue})
    }
    clearAllMemory(){
        const currentDarkTheme = this.state.darkTheme
        const currentHistory = this.state.history
        this.setState({...initialState})
        this.setState({darkTheme:currentDarkTheme,history:currentHistory})
    }
    saveOperationInHistory(currentCalculus){
       const currentHistory = [...this.state.history] 
    }
    calculateValues(values,currentOperation){
        if (currentOperation==='+'){
            values[0]= values[0]+values[1]
        }else if(currentOperation==='-'){  
            values[0]= values[0]-values[1]  
        }else if(currentOperation=='*'){
            values[0]= values[0]*values[1]
        }else if(currentOperation=='/'){
            values[0]= values[0]/values[1]    
        }

        values[1]=0
        return values[0]
    }
    pressEqual(){
        if (this.state.currentValue===0){ 
            return
        }else {
            const currentOperation = this.state.operation
            this.pressOperation(currentOperation)
            this.setState({
                operation: null,
                currentValue:0,
                clearDisplay:false,
            })    
        }
    }
    pressOperation(operation){
        if (operation=='÷'||operation=='×'){
            operation = operation=='÷'? '/':'*' 
        }
        if (this.state.currentValue===0){ 
            this.setState({operation, currentValue: 1,clearDisplay:true})
        }else{
            
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            const currentCalculus={firstValue:values[0], secondValue:values[1], operation:currentOperation, result:''}
            const currentListOfHistories = this.state.history
            values[0] = this.calculateValues(values,currentOperation)
            
            currentCalculus.result= values[0]
            currentListOfHistories.push(currentCalculus)

            this.setState({
                displayValue:values[0],
                operation: operation,
                currentOperation:1,
                clearDisplay:true,
                values,
                history:currentListOfHistories
            })
            
        }
    }

    addDigitOnDisplay(pressedDigit){
        
        if(pressedDigit==='.' && this.state.displayValue.includes('.')){
            return
        }
        if(pressedDigit==='.' && this.state.displayValue=='0'){
            this.state.displayValue ='0'
            const currentValue = this.state.displayValue
            const displayValue = currentValue + pressedDigit
            this.setState({displayValue, clearDisplay:false})
        }else{
            const isDisplayClean = this.state.displayValue ==='0' || this.state.clearDisplay
            const currentValue = isDisplayClean ? '' : this.state.displayValue
            const displayValue = currentValue + pressedDigit
            
            this.setState({displayValue, clearDisplay:false})
            
            if(pressedDigit!=='.'){
                const i = this.state.currentValue
                const newValue = parseFloat(displayValue)
                const values = [...this.state.values] 
                values[i] = newValue
                this.setState({values})
            }    
        }    
    }
    deleteDigit(){
        if (this.state.displayValue.length==1 && this.state.currentValue==1 ){
            this.clearSecondValueMemory()
            this.clearDisplayMemory()
        }else if (this.state.displayValue=='0'|| this.state.displayValue.length==1 ){
                this.clearAllMemory()
                return
        }else{
            const currentDisplayValue = this.state.displayValue
            const truncatedString = truncateString(currentDisplayValue,currentDisplayValue.length-1)
            this.setState({displayValue:truncatedString})
            const i = this.state.currentValue
            const newValue = parseFloat(truncatedString)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }
    render(){   
        const pressOperation = operation => this.pressOperation(operation)
        const addDigitOnDisplay = pressedDigit => this.addDigitOnDisplay(pressedDigit)
        const calculatorClass = this.state.darkTheme? 'calculator darkTheme':'calculator lightTheme '
        const themeIcon = this.state.darkTheme? darkThemeIcon : lightThemeIcon
        const cIconLink = this.state.darkTheme? darkCIcon : lightCIcon
        const deleteIconLink = this.state.darkTheme? darkDeleteIcon : lightDeleteIcon
        const deleteIconImage = <img  src={deleteIconLink} className="theme-icon"/>
        const cIconImage = <img  src={cIconLink} className="theme-icon"/>
        
        
        
        return(
            <div className={calculatorClass}>
                <div className="themeButton">
                    <img onClick={()=>this.setTheme()} src={themeIcon} className="theme-icon" alt="icon" />
                </div>
                <Display value={this.state.displayValue} list={this.state.history} />
                <div className="key-board">
                    <div className="numbers-column">
                        <Button buttonClass="orange-label" click={()=>this.clearAllMemory()} label={cIconImage} />
                        <Button buttonClass="number" label="7" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="4" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="1" click={addDigitOnDisplay} />    
                    </div>
                    <div className="numbers-column">     
                        <Button buttonClass="orange-label" label={deleteIconImage} click={()=>this.deleteDigit()}></Button>
                        <Button buttonClass="number" label="8" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="5" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="2" click={addDigitOnDisplay} />    
                        <Button buttonClass="number" label="0" click={addDigitOnDisplay} />    
                    </div>
                    <div className="numbers-column">
                        <Button buttonClass="percentage" label="%" />
                        <Button buttonClass="number" label="9" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="6" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="3" click={addDigitOnDisplay} />    
                        <Button buttonClass="number" label="." click={addDigitOnDisplay} />    
                    </div>
                    <div className="numbers-column " id="operation-buttons-column">
                        <Button buttonClass="operation" label="÷" click={pressOperation} />
                        <Button buttonClass="operation" label="×" click={pressOperation}/>
                        <Button buttonClass="operation" label="-" click={pressOperation}/>
                        <Button buttonClass="operation" label="+" click={pressOperation}/>    
                        <Button buttonClass="equal" label="=" click={()=>this.pressEqual()} />    
                    </div>
                </div>
            </div>
        )
    }
}