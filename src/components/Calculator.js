import React from "react";
import "../styles/Calculator.scss";

const handleMeasurementSelect = (event, dispatch) => {
  let newType = event.target.getAttribute("data-measurement");
  let name = event.target.title;

  dispatch({
    type: name === "coffee" ? "changeCoffeeType" : "changeWaterType",
    payload: newType,
  });
};

const handleInputChange = (amount, type, dispatch) => {
  const re = /^-?\d*[.,]?\d*$/;
  if (amount === "" || re.test(amount)) {
    dispatch({
      type: "changeAmount",
      calculatorType: type,
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
          type="number"
          className="calculator-input"
          onChange={(e) => handleInputChange(e.target.value, name, dispatch)}
          value={state.amount}
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
              onClick={(e) => console.log(e.target.value)}
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
