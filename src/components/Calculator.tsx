import React, { BaseSyntheticEvent, ReactElement, SyntheticEvent } from "react";
import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "../enums";
import "../styles/Calculator.scss";
import { Action } from "../types";

interface CalculatorProps {
    name: string;
    amount: number;
    selectedMeasurement: WaterMeasurementTypes | CoffeeMeasurementTypes;
    measurementTypes: WaterMeasurementTypes[] | CoffeeMeasurementTypes[];
    handleMeasurementChange: React.Dispatch<Action>;
    calculatorType: string;
}

const handleMeasurementSelect = (event : BaseSyntheticEvent, dispatch: React.Dispatch<Action>, calculatorType: string) : void => {
    let newMeasurementType = event.target.getAttribute("data-measurement");
    if(calculatorType === "coffee") {
        dispatch({type: "changeCoffeeMeasurement", payload: newMeasurementType as CoffeeMeasurementTypes });
    } else if (calculatorType === "water")
    {
        dispatch({type: "changeWaterMeasurement", payload: newMeasurementType as WaterMeasurementTypes});
    } else {
        throw new Error("Error when chaning measurement types.");
    }
}

const handleInputChange = (event : BaseSyntheticEvent) => {
    console.log(event);
}

const Calculator = (props : CalculatorProps) => (
    <div className="calculator-body">
        <h3 className="calculator-name">{props.name}</h3>
        <div className="calculator-screen">
            <input type="number" className="calculator-input" step="1" min="0" onChange={(e) => handleInputChange(e)} placeholder="00.00" />
            <p className="calculator-measurement-type">{props.selectedMeasurement}</p>
        </div>
        <div className="calculator-measurement-select" onClick={(e) => handleMeasurementSelect(e, props.handleMeasurementChange, props.calculatorType)}>
            {props.measurementTypes.map((measurment : CoffeeMeasurementTypes | WaterMeasurementTypes) : ReactElement => {
                return (
                    <p className="calculator-measurement" key={measurment} data-measurement={measurment}>{measurment}</p>
                );
            })}
        </div>
    </div>
)

export default Calculator;