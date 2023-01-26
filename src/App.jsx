import { useReducer } from 'react'
import './App.css'
import { DigitButton, OperationButton } from './Components/DigitButtons'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPEARTION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite: false,
        }
      }
      if (action.payload.digit === '0' && state.currentOperand === '0') return state
      if (action.payload.digit === '.' && state.currentOperand.includes('.')) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload.digit}`
      }
    
    case ACTIONS.CHOOSE_OPEARTION:
      if (state.currentOperand == null && state.previousOperand == null) return state

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      if (state.currentOperand === null) {
        return {
          ...state,
          operation: action.payload.operation,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload.operation,
        currentOperand: null
      }
    
    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.EVALUATE:
      if(
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      ) return state

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }

  }
}

function evaluate({previousOperand, currentOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(curr)) return ''
  let computedValue = '';
  switch (operation) {
    case '+':
      computedValue = prev + curr;
      break;
    
    case '*':
      computedValue = prev * curr;
      break;
    
    case '-':
      computedValue = prev - curr;
      break;
    
    case '/':
      computedValue = prev / curr;
      break;
    
  }

  return computedValue.toString();
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className="App">

      <div className='calculator-grid'>
        <div className="output" id='display'>
          <div className="previous-operand" id='display'>{previousOperand}{ operation }</div>
          <div className="current-operand" id='display'>{ currentOperand ? currentOperand : 0 }</div>
        </div>
        <button className='span-two' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <OperationButton operation='/' dispatch={dispatch} id='divide'/>
        <OperationButton operation='*' dispatch={dispatch} id='multiply'/>
        <DigitButton digit='7' dispatch={dispatch} id='seven'/>
        <DigitButton digit='8' dispatch={dispatch} id='eight'/>
        <DigitButton digit='9' dispatch={dispatch} id='nine'/>
        <OperationButton operation='-' dispatch={dispatch} id='subtract'/>
        <DigitButton digit='6' dispatch={dispatch} id='six'/>
        <DigitButton digit='5' dispatch={dispatch} id='five'/>
        <DigitButton digit='4' dispatch={dispatch} id='four'/>
        <OperationButton operation='+' dispatch={dispatch} id='add'/>
        <DigitButton digit='1' dispatch={dispatch} id='one'/>
        <DigitButton digit='2' dispatch={dispatch} id='two'/>
        <DigitButton digit='3' dispatch={dispatch} id='three'/>
        <button className='row-two' id='equals' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
        <DigitButton digit='0' dispatch={dispatch} id='zero'/>
        <DigitButton digit='.' dispatch={dispatch} id='decimal'/>
      </div>
    </div>
  )
}

export default App
