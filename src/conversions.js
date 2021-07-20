export const coffeeConversionRatios = {
    g: 1,
    tsp: 0.24,
    tbsp: 14.3,
    oz: 0.035274,
    beans: 0.1325,
}

export const waterConversionRatios = {
    g: 1,
    ml: 1,
    L: 0.01,
    "fl.oz": 0.033814,
    C: 64,
}

export const brewTypes = [
    {
        name: "Aeropress", 
        conversionRatio: 6
    },
    {
        name: "French Press", 
        conversionRatio: 12
    },
    {
        name: "V60", 
        conversionRatio: 16.67
    },
    {
        name: "Chemex", 
        conversionRatio: 17
    },
    {
        name: "Moka Pot", 
        conversionRatio: 10
    },
    {
        name: "Cold Brew", 
        conversionRatio: 4.44
    },
    {
        name: "Siphon", 
        conversionRatio: 16.67
    },
    {
        name: "Espresso", 
        conversionRatio: 2
    }
]

export function convertMeasurement(value, prevRatio, ratio) {
    let gramValue = parseFloat(value) / parseFloat(prevRatio);
    let finalValue = parseFloat(gramValue) * parseFloat(ratio);
    return parseFloat(finalValue.toPrecision(3));
}

export function calculcateCoffeAmount(coffeeAmount, coffeeConversionRatio, brewTypeConversionRatio) {
    return parseFloat((coffeeAmount * coffeeAmount))
}
