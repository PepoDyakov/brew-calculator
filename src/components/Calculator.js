import React from "react";
import "../styles/Calculator.css";

const handleMeasurementSelect = (event, calculatorType, dispatch) => {
  let newType = event.target.getAttribute("data-measurement");

  dispatch({
    type: "changeMeasurement",
    calculatorType: calculatorType,
    payload: newType,
  });
};

const handleInputChange = (amount, calculatorType, dispatch) => {
  const re = /^-?\d*[.,]?\d*$/;
  if (amount === "" || re.test(amount)) {
    dispatch({
      type: "changeAmount",
      calculatorType: calculatorType,
      payload: amount,
    });
  }
};

const Calculator = (props) => {
  const { state, dispatch, type, name } = props;
  return (
    <div className="calculator-body">
      <h3 className="calculator-name">{name}</h3>
      <div className="calculator-screen">
        <input
          className="calculator-input"
          onChange={(e) => handleInputChange(e.target.value, name, dispatch)}
          value={state.amount}
        />
        <p className="calculator-measurement-type">{state.type}</p>
      </div>
      <div className="calculator-measurement-select">
        {state.availableTypes.map((type) => {
          return (
            <p
              className="calculator-measurement"
              key={type}
              data-measurement={type}
              onClick={(e) => handleMeasurementSelect(e, name, dispatch)}
              title={props.name}
            >
              {type}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
