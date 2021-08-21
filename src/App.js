import React, { useReducer } from "react";
import Calculator from "./components/Calculator";
import Logo from "./assets/logo.png";
import DownArrow from "./assets/down-arrow.svg";
import {
  convertMeasurement,
  brewTypes,
  calculateAmount,
} from "./conversions";
import "./styles/App.css";

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
      if(action.calculatorType === "water") {
        return {
          ...state,
          water: {
            ...state.water,
            amount: convertMeasurement(state.water.amount, state.water.type, action.payload),
            type: Water[action.payload]
          }
        }
      } else {
        return {
          ...state,
          coffee: {
            ...state.coffee,
            amount: convertMeasurement(state.coffee.amount, state.coffee.type, action.payload, false),
            type: Coffee[action.payload]
          }
        }
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
            amount: calculateAmount(action.payload, state.brewType.conversionRatio)
          }
        };
      } else {
        return {
          ...state,
          water: {
            ...state.water,
            amount: calculateAmount(action.payload, state.brewType.conversionRatio, true)
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
          amount: calculateAmount(state.water.amount, action.payload.conversionRatio)
        },
        brewType: action.payload
      }

    default:
      throw new Error("Error setting state on measurement type.");
  }
};

const handleBrewTypeSelect = (event, dispatch) => {
  let newBrewType = brewTypes.find(x => x.name === event.target.value);
  
  dispatch({
    type: "changeBrewType",
    payload: newBrewType
  });
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <div className="main-wrapper">
        <div className="header-wrapper">
            <img src={Logo} alt="Brewculator Logo" className="logo"/>
            <nav className="nav">
                <a className="page-link" href="/">
                    about the project
                </a>
            </nav>
        </div>
        <div className="hero">
          <h1 className="title" title="Brewculator">Brewculator</h1>
          <div className="brew-type-select-wrapper">
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
                  >
                    {brew.name}
                  </option>
                );
              })}
            </select>
            <img src={DownArrow} className="down-arrow" alt="Down Chevron" />
          </div>
        </div>
        <div className="calculator-background">
          <Calculator state={state.coffee} dispatch={dispatch} name="coffee beans" />
          <div className="divider"></div>
          <Calculator state={state.water} dispatch={dispatch} name="water" />
        </div>
        <div className="footer-wrapper">
            <p className="footer-copy">brewculator web</p>
            <p className="footer-copy">made by petar and alexander</p>
        </div>
      </div>
    </div>
  );
};

export default App;
