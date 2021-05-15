import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "./enums";

const coffeeConversionRatios = {
    "g": 1,
    "tsp": 0.24,
    "tbsp": 14.3,
    "oz": 0.035274,
    "beans": 0.1325
}

const waterConversionRatios = {
    "g": 1,
    "ml": 1,
    "L": 0.01,
    "fl.oz": 0.033814,
    "C": 64
}

export function convertMeasurement(value: number, valueType: CoffeeMeasurementTypes | WaterMeasurementTypes, forType: string): number {
    if(forType === "coffee")
    {
        return value * coffeeConversionRatios[valueType as CoffeeMeasurementTypes];
    } else if(forType === "water")
    {
        return value * waterConversionRatios[valueType as WaterMeasurementTypes];
    } else {
        console.error("Failure in conversion.");
        return 0.00;
    }
}