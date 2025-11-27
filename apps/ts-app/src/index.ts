import { greet } from "@iamyoki/monorepo-25.11.21-greet";
import { randomChoice } from "@iamyoki/monorepo-25.11.21-random-choice";
import { randomFruit } from "@iamyoki/monorepo-25.11.21-random-fruit";

console.log(greet());

const items = ["apple", "banana", "orange"];
const randomItem = randomChoice(items);
console.log(randomItem);

console.log(randomFruit());
