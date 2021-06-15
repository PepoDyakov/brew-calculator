import React, { useReducer } from 'react'
import Calculator from './components/Calculator'
import { convertMeasurement, coffeeConversionRatios, waterConversionRatios } from "./conversions";

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
            return {
                ...state,
                water: {
                    ...state.water,
                    amount: action.payload,
                },
            }
        case 'changeCoffeeAmount':
            return {
                ...state,
                coffee: {
                    ...state.coffee,
                    amount: action.payload,
                },
            }
        default:
            throw new Error('Error setting state on measurement type.')
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    return (
        <div className="App">
            <Calculator state={state.water} dispatch={dispatch} name="water" />
            <Calculator
                state={state.coffee}
                dispatch={dispatch}
                name="coffee"
            />
        </div>
    )
}

export default App
