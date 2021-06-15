import React from 'react'
import '../styles/Calculator.scss'

const handleMeasurementSelect = (event, dispatch) => {
    let newType = event.target.getAttribute('data-measurement')
    let name = event.target.title

    dispatch({
        type: name === 'coffee' ? 'changeCoffeeType' : 'changeWaterType',
        payload: newType,
    })
}

const handleInputChange = (event, dispatch) => {
    let inputType = event.target.getAttribute('data-inputtype')
    let convertedAmount = parseFloat(event.target.value)
    if (event.target.value.length > 0) {
        dispatch({
            type:
                inputType === 'water'
                    ? 'changeWaterAmount'
                    : 'changeCoffeeAmount',
            payload: convertedAmount,
        })
    }
}

const Calculator = (props) => {
    const { state, dispatch, type, name } = props
    return (
        <div className="calculator-body">
            <h3 className="calculator-name">{name}</h3>
            <div className="calculator-screen">
                <input
                    type="number"
                    className="calculator-input"
                    step="1"
                    min="0"
                    onChange={(e) => handleInputChange(e, dispatch)}
                    placeholder="00.00"
                    value={state.amount}
                    data-inputtype={name}
                />
                <p className="calculator-measurement-type">{type}</p>
            </div>
            <div className="calculator-measurement-select">
                {state.availableTypes.map((type) => {
                    return (
                        <p
                            className="calculator-measurement"
                            key={type}
                            data-measurement={type}
                            onClick={(e) =>
                                handleMeasurementSelect(e, dispatch)
                            }
                            title={props.name}
                        >
                            {type}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Calculator
