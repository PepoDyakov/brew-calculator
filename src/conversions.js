const coffeeConversionRatios = {
    g: 1,
    tsp: 0.24,
    tbsp: 14.3,
    oz: 0.035274,
    beans: 0.1325,
}

const waterConversionRatios = {
    g: 1,
    ml: 1,
    L: 0.01,
    flOz: 0.033814,
    C: 64,
}

export function convertMeasurement(value, valueType, forType) {
    if (forType === 'coffee') {
        return value * coffeeConversionRatios[valueType]
    } else if (forType === 'water') {
        return value * waterConversionRatios[valueType]
    } else {
        console.error('Failure in conversion.')
        return 0.0
    }
}
