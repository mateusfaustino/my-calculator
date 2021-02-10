import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue:'0',
    clearDisplay:false,
    operation:null,
    values:[0,0],//operands
    currentValue:0
};
export default class Calculator extends Component{
    state = {...initialState}
    clearMemory(){
        this.setState({...initialState})
    }

    setOparation(operation){
        
        if (operation=='÷'||operation=='×'){
            operation = operation=='÷'? '/':'*' 
        }
        
        console.log("this.state.currentValue ",this.state.currentValue)
        if(this.state.currentValue===0){
            
            this.setState({operation, currentValue: 1,clearDisplay:true})

            console.log("operation: ",this.state.operation)
            console.log("novo currentValue: ",this.state.currentValue)
            console.log("clearDisplay: ",this.state.clearDisplay)

        }else{
            const wasEqualsPressed = operation==='='
            console.log("wasEqualsPressed ",wasEqualsPressed)

            const currentOperation = this.state.operation

            const values = [...this.state.values]
            if(currentOperation==='+'){
                
                values[0]= values[0]+values[1]

            }else if(currentOperation==='-'){
                
                values[0]= values[0]-values[1]  

            }else if(currentOperation=='*'){
                values[0]= values[0]*values[1]

            }else if(currentOperation=='/'){
                values[0]= values[0]/values[1]    
            }
            values[1]=0
            
            this.setState({
                displayValue:values[0],
                operation: wasEqualsPressed ? null : operation,
                currentOperation: wasEqualsPressed ? 0:1,
                clearDisplay:!wasEqualsPressed,
                values
            })
        }
    }

    addDigitOnDisplay(pressedDigit){
        console.log(pressedDigit)
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
                console.log("i: ",this.state.currentValue)
                const newValue = parseFloat(displayValue)
                const values = [...this.state.values]//operands 
                values[i] = newValue
                this.setState({values})//operands 
                console.log("values: ",values)
            }    
        }
        

        
        
        
    }
    render(){
        const setOparation = operation => this.setOparation(operation)
        const addDigitOnDisplay = pressedDigit => this.addDigitOnDisplay(pressedDigit)
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <div className="key-board">
                    <div className="numbers-column">
                        <Button buttonClass="orange-label" click={()=>this.clearMemory()} label="C" />
                        <Button buttonClass="number" label="7" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="4" click={addDigitOnDisplay} />
                        <Button buttonClass="number" label="1" click={addDigitOnDisplay} />    
                    </div>
                    <div className="numbers-column">
                    
                        <Button buttonClass="orange-label" label=".." />
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
                        <Button buttonClass="operation" label="÷" click={setOparation} />
                        <Button buttonClass="operation" label="×" click={setOparation}/>
                        <Button buttonClass="operation" label="-" click={setOparation}/>
                        <Button buttonClass="operation" label="+" click={setOparation}/>    
                        <Button buttonClass="equal" label="=" click={setOparation} />    
                    </div>
                
                </div>
            </div>
        )
    }
}