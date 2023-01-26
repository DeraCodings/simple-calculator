import { ACTIONS } from "../App";

export function DigitButton(props) {
    const { dispatch, digit, id } = props;
    return (
        <button className="buttons" id={id} onClick={() => dispatch({
            type: ACTIONS.ADD_DIGIT,
            payload: {digit}
        })}>{ digit }</button>
    )
}

export function OperationButton(props) {
    const { operation, dispatch, id } = props;
    return (
        <button className="buttons" id={id} onClick={() => dispatch({
            type: ACTIONS.CHOOSE_OPEARTION,
            payload: {operation}
        })}>{ operation }</button>
    )
}