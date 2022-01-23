import classNames from "classnames";
import { useSpring, animated } from "@react-spring/web";

import styles from "../styles/Calculator.module.css";

const ANIMATION_STYLES = {
  from: { opacity: 0, y: -50 },
  to: { opacity: 1, y: 0 },
};

const Calculator = (props) => {
  const { state, dispatch, name } = props;
  const [animationStyles, api] = useSpring(() => ANIMATION_STYLES);

  const handleMeasurementSelect = (event, calculatorType) => {
    let newType = event.target.getAttribute("data-measurement");

    dispatch({
      type: "changeMeasurement",
      calculatorType: calculatorType,
      payload: newType,
    });

    api.start(ANIMATION_STYLES);
  };

  const handleInputChange = (amount, calculatorType) => {
    const re = /^-?\d*[.,]?\d*$/;
    if (amount === "" || re.test(amount)) {
      dispatch({
        type: "changeAmount",
        calculatorType: calculatorType,
        payload: amount,
      });
    }
  };

  return (
    <div className={styles.calculatorBody}>
      <h3 className={styles.calculatorName}>{name}</h3>
      <div className={styles.calculatorScreen}>
        <animated.div style={animationStyles}>
          <input
            className={[styles.calculatorInput]}
            placeholder="0.00"
            maxLength={4}
            onChange={(e) => handleInputChange(e.target.value, name)}
            value={state.amount}
          />
        </animated.div>
        <animated.div style={animationStyles}>
          <p className={styles.calculatorMeasurementType}>{state.type}</p>
        </animated.div>
      </div>
      <div className={styles.measurementWrapper}>
        <div className={styles.calculatorMeasurementSelect}>
          {state.availableTypes.map((type) => {
            return (
              <div className={styles.measurement} key={type}>
                <div
                  className={classNames(
                    styles.measurementBackground,
                    state.type === type
                      ? styles.measurementBackgroundActive
                      : ""
                  )}
                />
                <p
                  className={classNames(
                    styles.calculatorMeasurement,
                    `${
                      state.type === type && styles.calculatorMeasurementActive
                    }`
                  )}
                  data-measurement={type}
                  onClick={(e) => handleMeasurementSelect(e, name)}
                  title={props.name}
                >
                  {type}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
