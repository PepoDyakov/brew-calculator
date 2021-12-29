import React, { useReducer } from "react";
import Calculator from "../components/Calculator";
import { convertMeasurement, brewTypes, calculateAmount } from "../conversions";
import DownArrow from "../assets/down-arrow.svg";

import styles from "../styles/Home.module.css";

const Coffee = {
  g: "g",
  tsp: "tsp",
  tbsp: "tbsp",
  oz: "oz",
  beans: "beans",
};

const Water = {
  g: "g",
  ml: "ml",
  L: "L",
  "fl.oz": "fl.oz",
  C: "C",
};

const initialState = {
  water: {
    type: Water.g,
    amount: "",
    availableTypes: Object.values(Water),
  },
  coffee: {
    type: Coffee.g,
    amount: "",
    availableTypes: Object.values(Coffee),
  },
  brewType: brewTypes[2],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeMeasurement":
      if (action.calculatorType === "water") {
        return {
          ...state,
          water: {
            ...state.water,
            amount: convertMeasurement(
              state.water.amount,
              state.water.type,
              action.payload
            ),
            type: Water[action.payload],
          },
        };
      } else {
        return {
          ...state,
          coffee: {
            ...state.coffee,
            amount: convertMeasurement(
              state.coffee.amount,
              state.coffee.type,
              action.payload,
              false
            ),
            type: Coffee[action.payload],
          },
        };
      }
    case "changeAmount":
      if (action.calculatorType === "water") {
        return {
          ...state,
          water: {
            ...state.water,
            amount: action.payload,
          },
          coffee: {
            ...state.coffee,
            amount: calculateAmount(
              action.payload,
              state.brewType.conversionRatio
            ),
          },
        };
      } else {
        return {
          ...state,
          water: {
            ...state.water,
            amount: calculateAmount(
              action.payload,
              state.brewType.conversionRatio,
              true
            ),
          },
          coffee: {
            ...state.coffee,
            amount: action.payload,
          },
        };
      }
    case "changeBrewType":
      return {
        ...state,
        coffee: {
          ...state.coffee,
          amount: calculateAmount(
            state.water.amount,
            action.payload.conversionRatio
          ),
        },
        brewType: action.payload,
      };

    default:
      throw new Error("Error setting state on measurement type.");
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleBrewTypeSelect = (event, dispatch) => {
    let newBrewType = brewTypes.find((x) => x.name === event.target.value);

    dispatch({
      type: "changeBrewType",
      payload: newBrewType,
    });
  };

  return (
    <>
      <div className={styles.hero}>
        <h1 className={styles.title} title="Brewculator">
          Brewculator
        </h1>
        <div className={styles.brewTypeSelectWrapper}>
          <select
            className={styles.brewTypeSelect}
            onChange={(e) => handleBrewTypeSelect(e, dispatch)}
            defaultValue={state.brewType.name}
          >
            {brewTypes.map((brew, index) => {
              return (
                <option
                  className={styles.brewTypeOption}
                  key={brew.name + index}
                  value={brew.name}
                >
                  {brew.name}
                </option>
              );
            })}
          </select>
          <img
            src={DownArrow}
            className={styles.downArrow}
            alt="Down Chevron"
          />
        </div>
      </div>
      <div className={styles.calculatorBackground}>
        <Calculator
          state={state.coffee}
          dispatch={dispatch}
          name="coffee beans"
        />
        <div className={styles.divider}></div>
        <Calculator state={state.water} dispatch={dispatch} name="water" />
      </div>
    </>
  );
}
