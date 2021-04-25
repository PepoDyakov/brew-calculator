import Calculator from "./components/Calculator";
import { WATER_CALCULATOR_MEASUREMENTS } from "./constants";

function App() {
  return (
    <div className="App">
      <Calculator 
        name="Water"
        amount={100}
        measurementTypes={WATER_CALCULATOR_MEASUREMENTS}
        selectedMeasurement="g"
      />
    </div>
  );
}

export default App;
