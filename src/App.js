import React, { useReducer } from "react";
import Calculator from "./components/Calculator";
import {
  convertMeasurement,
  coffeeConversionRatios,
  waterConversionRatios,
  brewTypes,
  calculateAmount,
} from "./conversions";

const Coffee = {
  g: "g",
  tsp: "tsp",
  tbsp: "tbsp",
  oz: "oz",
  b: "beans",
};

const Water = {
  g: "g",
  ml: "ml",
  L: "L",
  oz: "fl.oz",
  C: "C",
};

// SLAB TI E KODA BRATO
// VLIZAI V TREEHOUSE DA SE UCHISH
// SMESHNIK I CUMSHOTTER

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
    case "changeAmount":
      if (action.calculatorType === "water") {
        return {
          ...state,
          water: {
            ...state.water,
            amount: action.payload,
          },
        };
      } else {
        return {
          ...state,
          coffee: {
            ...state.coffee,
            amount: action.payload,
          },
        };
      }
    case "changeBrewType":

    default:
      throw new Error("Error setting state on measurement type.");
  }
};

const handleBrewTypeSelect = (event, dispatch) => {
  console.log(event.target.dataset);
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <div className="brew-type-selector">
        <select
          className="brew-type-select"
          onChange={(e) => handleBrewTypeSelect(e, dispatch)}
          defaultValue={state.brewType.name}
        >
          {brewTypes.map((brew, index) => {
            return (
              <option
                className="brew-type-option"
                key={brew.name + index}
                value={brew.name}
                databrew={brew}
              >
                {brew.name}
              </option>
            );
          })}
        </select>
      </div>
      <Calculator state={state.water} dispatch={dispatch} name="water" />
      <Calculator state={state.coffee} dispatch={dispatch} name="coffee" />
    </div>
  );
};

export default App;
