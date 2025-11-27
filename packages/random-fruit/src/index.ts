import { randomChoice } from "@iamyoki/monorepo-25.11.21-random-choice";

const fruits = ["apple", "banana", "orange"];

export function randomFruit() {
  return randomChoice(fruits);
}
