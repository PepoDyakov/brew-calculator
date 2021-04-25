import "../styles/Calculator.css";

const handleMeasurementSelect = (event) => {
    console.log(event.target);
}

const handleInputChange = (event) => {
    console.log(event);
}

const Calculator = (props) => {
    return (
        <div className="calculator-body">
            <h3 className="calculator-name">{props.name}</h3>
            <div className="calculator-screen">
                <input type="number" className="calculator-input" step="0.01" min="0" onChange={(e) => handleInputChange(e)} />
                <p className="calculator-measurement-type">{props.selectedMeasurement}</p>
            </div>
            <div className="calculator-measurement-select" onClick={(e) => handleMeasurementSelect(e)}>
                {props.measurementTypes.map(measurment => {
                    return (
                        <p className="calculator-measurement" key={measurment}>{measurment}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Calculator;