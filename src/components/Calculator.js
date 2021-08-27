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
  const { state, dispatch, name } = props;
  console.log(state.amount.length);
  return (
    <div className="calculator-body">
      <h3 className="calculator-name">{name}</h3>
      <div className="calculator-screen">
        <input
          className="calculator-input"
          placeholder="0.00"
          maxLength={4}
          onChange={(e) => handleInputChange(e.target.value, name, dispatch)}
          value={state.amount}
        />
        <p className="calculator-measurement-type">{state.type}</p>
      </div>
      <div className="measurement-wrapper">
        <div
          className={`measurement-background measurement-background-${state.type}}`}
        ></div>
        <div className="calculator-measurement-select">
          {state.availableTypes.map((type) => {
            return (
              <p
                className={`calculator-measurement ${
                  state.type === type ? "calculator-measurement-active" : ""
                }`}
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
    </div>
  );
};

export default Calculator;
