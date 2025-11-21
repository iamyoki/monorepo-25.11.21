import { greet } from "greet";
import { randomChoice } from "random-choice";

console.log(greet());

const items = ["apple", "banana", "orange"];
const randomItem = randomChoice(items);
console.log(randomItem);
