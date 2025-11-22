import { randomChoice } from "random-choice";

const fruits = ["apple", "banana", "orange"];

export function randomFruit() {
  return randomChoice(fruits);
}
