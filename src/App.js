import React, { useReducer } from 'react'
import Calculator from './components/Calculator'

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
            return {
                ...state,
                water: {
                    ...state.water,
                    type: action.payload,
                },
            }
        case 'changeCoffeeType':
            return {
                ...state,
                coffee: {
                    ...state.coffee,
                    type: action.payload,
                },
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
