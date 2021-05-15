import { CoffeeMeasurementTypes, WaterMeasurementTypes } from "./enums"

export type appState = {
    waterMeasurementType: WaterMeasurementTypes,
    coffeeMeasurementType: CoffeeMeasurementTypes
  }
  
export type Action = { type: "changeWaterMeasurement", payload: WaterMeasurementTypes } | { type: "changeCoffeeMeasurement", payload: CoffeeMeasurementTypes }