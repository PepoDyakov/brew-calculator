import { useReducer } from "react";
import Calculator from "./components/Calculator";
import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "./enums";
import { Action, appState } from "./types";


const initialState = {
  waterMeasurementType: WaterMeasurementTypes.Grams,
  waterAmount: 0,
  coffeeMeasurementType: CoffeeMeasurementTypes.Grams,
  coffeeAmount: 0
} as appState;

const reducer = (state : appState, action : Action) : appState => {
  switch (action.type) {
    case "changeCoffeeMeasurement":
      return {
        ...state, 
        coffeeMeasurementType: action.payload
      }
    case "changeWaterMeasurement":
      return {
        ...state,
        waterMeasurementType: action.payload
      }
    case "changeWaterAmount":
      return {
        ...state,
        waterAmount: action.payload
      }
    case "changeCoffeeAmount":
      return {
        ...state,
        coffeeAmount: action.payload
      }
    default:
      throw new Error("Error setting state on measurement type.")
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <div className="App">
      <Calculator 
        name="Water"
        amount={100}
        measurementTypes={[
          WaterMeasurementTypes.Grams,
          WaterMeasurementTypes.Milliliter,
          WaterMeasurementTypes.Liter,
          WaterMeasurementTypes.FluidOunce,
          WaterMeasurementTypes.C
        ]}
        selectedMeasurement={state.waterMeasurementType}
        dispatch={dispatch}
        value={state.waterAmount}
        calculatorType="water"
      />
      <Calculator 
        name="Coffee"
        amount={100}
        measurementTypes={[
          CoffeeMeasurementTypes.Grams,
          CoffeeMeasurementTypes.TeaSpoon,
          CoffeeMeasurementTypes.TableSpoon,
          CoffeeMeasurementTypes.Ounce,
          CoffeeMeasurementTypes.Beans
        ]}
        selectedMeasurement={state.coffeeMeasurementType}
        dispatch={dispatch}
        value={state.coffeeAmount}
        calculatorType="coffee"
      />
    </div>
  );
}

export default App;

