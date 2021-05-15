import React, { BaseSyntheticEvent, ReactElement } from "react";
import { convertMeasurement } from "../conversions";
import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "../enums";
import "../styles/Calculator.scss";
import { Action } from "../types";

interface CalculatorProps {
    name: string;
    amount: number;
    selectedMeasurement: WaterMeasurementTypes | CoffeeMeasurementTypes;
    measurementTypes: WaterMeasurementTypes[] | CoffeeMeasurementTypes[];
    dispatch: React.Dispatch<Action>;
    value: number;
    calculatorType: string;
}

const handleMeasurementSelect = (event : BaseSyntheticEvent, dispatch: React.Dispatch<Action>, calculatorType: string) : void => {
    let newMeasurementType = event.target.getAttribute("data-measurement");
    
    if(newMeasurementType === null) return;
    
    if(calculatorType === "coffee") {
        dispatch({ type: "changeCoffeeMeasurement", payload: newMeasurementType as CoffeeMeasurementTypes });
    } else if (calculatorType === "water")
    {
        dispatch({ type: "changeWaterMeasurement", payload: newMeasurementType as WaterMeasurementTypes });
    } else {
        throw new Error("Error when chaning measurement types.");
    }
}

const handleInputChange = (event : BaseSyntheticEvent, dispatch: React.Dispatch<Action>, calculatorType: string) => {
    const inputValue = event.target.value;
    dispatch({ type: calculatorType === "coffee" ? "changeCoffeeAmount" : "changeWaterAmount", payload: parseFloat(inputValue) });
}

const Calculator = (props : CalculatorProps) => (
    <div className="calculator-body">
        <h3 className="calculator-name">{props.name}</h3>
        <div className="calculator-screen">
            <input type="number" className="calculator-input" step="1" min="0" onChange={(e) => handleInputChange(e, props.dispatch, props.calculatorType)} placeholder="00.00" value={convertMeasurement(props.value, props.selectedMeasurement, props.calculatorType)}/>
            <p className="calculator-measurement-type">{props.selectedMeasurement}</p>
        </div>
        <div className="calculator-measurement-select" onClick={(e) => handleMeasurementSelect(e, props.dispatch, props.calculatorType) }>
            {props.measurementTypes.map((measurment : CoffeeMeasurementTypes | WaterMeasurementTypes) : ReactElement => {
                return (
                    <p className="calculator-measurement" key={measurment} data-measurement={measurment}>{measurment}</p>
                );
            })}
        </div>
    </div>
)

export default Calculator;