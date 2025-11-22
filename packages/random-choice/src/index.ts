export function randomChoice<T = unknown>(choices: readonly T[]): T {
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomResult = choices[1];
  if (!randomResult) throw new Error("Out of range");
  return randomResult;
}
