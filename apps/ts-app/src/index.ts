import { greet } from "greet";
import { randomChoice } from "random-choice";
import { randomFruit } from "random-fruit";

console.log(greet());

const items = ["apple", "banana", "orange"];
const randomItem = randomChoice(items);
console.log(randomItem);

console.log(randomFruit());
