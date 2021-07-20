import React, { useReducer } from 'react'
import Calculator from './components/Calculator'
import { convertMeasurement, coffeeConversionRatios, waterConversionRatios, brewTypes, calculateAmount } from "./conversions";

const Coffee = {
    g: 'g',
    tsp: 'tsp',
    tbsp: 'tbsp',
    oz: 'oz',
    b: 'beans',
}

const Water = {
    g: 'g',
    ml: 'ml',
    L: 'L',
    oz: 'fl.oz',
    C: 'C',
}

const initialState = {
    water: {
        type: Water.g,
        amount: 0.0,
        availableTypes: Object.values(Water),
    },
    coffee: {
        type: Coffee.g,
        amount: 0.0,
        availableTypes: Object.values(Coffee),
    },
    brewType: brewTypes[2]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeWaterType':
            if(action.payload !== state.water.type) { 
                console.log(state.water.amount, waterConversionRatios[state.water.type], waterConversionRatios[action.payload])
                let convertedWaterAmount = convertMeasurement(state.water.amount, waterConversionRatios[state.water.type], waterConversionRatios[action.payload]);
                return {
                    ...state,
                    water: {
                        ...state.water,
                        amount: convertedWaterAmount,
                        type: action.payload,
                    },
                }
            } else {
                return { 
                    ...state
                }
            }
        case 'changeCoffeeType':
            if(action.payload !== state.coffee.type) {
                let convertedCoffeeAmount = convertMeasurement(state.coffee.amount, coffeeConversionRatios[state.coffee.type],coffeeConversionRatios[action.payload]);
                return {
                    ...state,
                    coffee: {
                        ...state.coffee,
                        amount: convertedCoffeeAmount,
                        type: action.payload,
                    },
                }
            } else  {
                return { 
                    ...state
                }
            }
        case 'changeWaterAmount':
            let calculatedCoffeeAmount = calculateAmount(action.payload, coffeeConversionRatios[state.coffee.amount], state.brewType);
            return {
                ...state,
                water: {
                    ...state.water,
                    amount: action.payload,
                },
                coffee: {
                    ...state.coffee,
                    amount: calculatedCoffeeAmount
                }
            }
        case 'changeCoffeeAmount':
            let calculatedWaterAmount = calculateAmount(action.payload, waterConversionRatios[state.water.amount], state.brewType);
            return {
                ...state,
                coffee: {
                    ...state.coffee,
                    amount: action.payload,
                },
                water: {
                    ...state.water,
                    amount: calculatedWaterAmount
                }
            }
        case 'changeBrewType':
            let convertedWaterAmount = parseFloat(parseFloat(state.water.amount) * parseFloat(action.payload.conversionRatio));
            return {
                ...state,
                water: {
                    ...state.water,
                    amount: convertedWaterAmount
                },
                brewType: action.payload
            }
        default:
            throw new Error('Error setting state on measurement type.')
    }
}

const handleBrewTypeSelect = (event, dispatch) => {
    console.log(event.target.dataset);
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    return (
        <div className="App">
            <div className="brew-type-selector">
                <select className="brew-type-select" onChange={(e) => handleBrewTypeSelect(e, dispatch)} defaultValue={state.brewType.name}>
                    {brewTypes.map((brew, index) => {
                        return (
                            <option className="brew-type-option" key={brew.name + index} value={brew.name} databrew={brew}>{brew.name}</option>
                        )
                    })}
                </select>
            </div>
            <Calculator state={state.water} dispatch={dispatch} name="water" />
            <Calculator
                state={state.coffee}
                brewTypes={brewTypes}
                dispatch={dispatch}
                name="Coffee"
            />
        </div>
    )
}

export default App
