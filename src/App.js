import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <label for="coffee">Water</label>
      <input name="water" type="number" min="0.0001" max="999" />
      <select default="ml">
        <option value="ml">ml</option>
        <option value="g">g</option>
        <option value="fluid ounce">fl.oz</option>
        <option value="liter">L</option>
        <option value="cups">C</option>
      </select>
      <label for="coffee">Coffee</label>
      <input name="coffee" type="number" min="0.0001" max="999" />
      <select default="gr" >
        <option value="grams">g</option>
        <option value="tea spoon">tsp</option>
        <option value="table spoon">tbsp</option>
        <option value="ounce">oz</option>
        <option value="beans">beans</option>
      </select>
    </div>
  );
}

export default App;
