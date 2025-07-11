export const rollDice = (diceNotation: string): number => {
  const parts = diceNotation.toLowerCase().split("d");
  if (parts.length !== 2) {
    throw new Error("Formato de dado inválido. Use NdS (ex: 1d6, 2d10).");
  }

  const numDice = parseInt(parts[0], 10);
  const numSides = parseInt(parts[1], 10);

  if (isNaN(numDice) || isNaN(numSides) || numDice <= 0 || numSides <= 0) {
    throw new Error("Número de dados ou lados inválido.");
  }

  let totalRoll = 0;
  for (let i = 0; i < numDice; i++) {
    totalRoll += Math.floor(Math.random() * numSides) + 1;
  }
  return totalRoll;
};