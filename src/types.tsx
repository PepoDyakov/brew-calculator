import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "./enums"

export type appState = {
    waterMeasurementType: WaterMeasurementTypes,
    waterAmount: number,
    coffeeMeasurementType: CoffeeMeasurementTypes,
    coffeeAmount: number
  }
  
export type Action = 
{ type: "changeWaterMeasurement", payload: WaterMeasurementTypes } | 
{ type: "changeCoffeeMeasurement", payload: CoffeeMeasurementTypes } |
{ type: "changeWaterAmount", payload: number } |
{ type: "changeCoffeeAmount", payload: number }