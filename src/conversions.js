export const coffeeConversionRatios = {
  g: 1,
  tsp: 0.142857,
  tbsp: 0.06993,
  oz: 0.035274,
  bns: 7.547169,
};

export const waterConversionRatios = {
  g: 1,
  ml: 1,
  L: 0.001,
  "fl.oz": 0.033814,
  C: 64,
};

export const brewTypes = [
  {
    name: "Aeropress",
    conversionRatio: 6,
  },
  {
    name: "French Press",
    conversionRatio: 12,
  },
  {
    name: "V60",
    conversionRatio: 16.67,
  },
  {
    name: "Chemex",
    conversionRatio: 17,
  },
  {
    name: "Moka Pot",
    conversionRatio: 10,
  },
  {
    name: "Cold Brew",
    conversionRatio: 4.44,
  },
  {
    name: "Siphon",
    conversionRatio: 16.67,
  },
  {
    name: "Espresso",
    conversionRatio: 2,
  },
];

export function convertMeasurement(value, prevRatio, ratio, isWater = true) {
  if (value.length === 0) {
    return "";
  }
  let prevRatioValue = isWater
    ? waterConversionRatios[prevRatio]
    : coffeeConversionRatios[prevRatio];
  let ratioValue = isWater
    ? waterConversionRatios[ratio]
    : coffeeConversionRatios[ratio];
  let gramValue = parseFloat(value) / parseFloat(prevRatioValue);
  let finalValue = parseFloat(gramValue) * parseFloat(ratioValue);
  return parseFloat(finalValue.toPrecision(3)).toString();
}

export function calculateAmount(amount, ratio, isDivide = false) {
  if (amount.length === 0) {
    return "";
  }

  if (isDivide) {
    return parseFloat(parseFloat(amount) / parseFloat(ratio))
      .toPrecision(3)
      .toString();
  } else {
    return parseFloat(parseFloat(amount) * parseFloat(ratio))
      .toPrecision(3)
      .toString();
  }
}
