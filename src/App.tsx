import { useReducer } from "react";
import Calculator from "./components/Calculator";
import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "./enums";
import { Action, appState } from "./types";


const initialState = {
  waterMeasurementType: WaterMeasurementTypes.Grams,
  coffeeMeasurementType: CoffeeMeasurementTypes.Grams
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
        handleMeasurementChange={dispatch}
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
        handleMeasurementChange={dispatch}
        calculatorType="coffee"
      />
    </div>
  );
}

export default App;
