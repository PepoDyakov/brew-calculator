import React from "react";

import styles from "../styles/Calculator.module.css";

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

  return (
    <div className={styles.calculatorBody}>
      <h3 className={styles.calculatorName}>{name}</h3>
      <div className={styles.calculatorScreen}>
        <input
          className={styles.calculatorInput}
          placeholder="0.00"
          maxLength={4}
          onChange={(e) => handleInputChange(e.target.value, name, dispatch)}
          value={state.amount}
        />
        <p className={styles.calculatorMeasurementType}>{state.type}</p>
      </div>
      <div className={styles.measurementWrapper}>
        <div
          className={[
            styles.measurementBackground,
            `${styles.measurementBackground}${state.type}`,
          ]}
        ></div>
        <div className={styles.calculatorMeasurementSelect}>
          {state.availableTypes.map((type) => {
            return (
              <p
                className={[
                  styles.calculatorMeasurement,
                  `${
                    state.type === type
                      ? styles.calculatorMeasurementActive
                      : ""
                  }`,
                ]}
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
