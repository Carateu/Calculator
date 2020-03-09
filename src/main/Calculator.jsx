import React, { Component } from 'react'
import './Calculator.css'
import Button from '../Components/Button'
import Display from '../Components/Display'

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{

    state = {...initialState}

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({ operation, current:1, clearDisplay: true})
        }
        else{
            const equals = operation === "="
            const currentOperation = this.state.operation
            
            const values = [...this.state.values]

            switch (currentOperation){
                case "+":
                    values[0] = values[0] + values[1]
                    break;
                case "-":
                    values[0] = values[0] - values[1]
                    break;
                case "/":
                    values[0] = values[0] / values[1]
                    break;
                case "*":
                    values[0] = values[0] * values[1]
                    break;
                case "√":
                    values[0] = Math.sqrt(values[0])
                    break;
                case "^":
                    values[0] = Math.pow(values[0],values[1])
                    break;
                case "%":
                    values[0] = values[0] % values[1]
                    break;
                case "π":
                    values[0] = 3.14
                    break;
                case "log":
                    values[0] = Math.log(values[0])
                
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

       const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay

        const currentValue = clearDisplay ? ' ' : this.state.displayValue
        const newDisplayValue = currentValue + n
        this.setState({ displayValue: newDisplayValue, clearDisplay:false })

        if(n !== '.'){
            // armazenando a posição atual no array
            const i = this.state.current
            // transformando o displayValue num float e armazenando-o
            const newValue= parseFloat(newDisplayValue)
            // clonando o array values
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }
 


    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="√" click={this.setOperation} spOp />
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation />
                <Button label="^" click={this.setOperation} spOp />
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation />
                <Button label="%" click={this.setOperation} spOp />
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation />
                <Button label="log" click={this.setOperation} spOp/>
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation />
                <Button label="π" click={this.setOperation} spOp/>
            </div>
        )
    }
}