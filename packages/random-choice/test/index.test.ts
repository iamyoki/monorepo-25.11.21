import { describe, it } from "node:test";
import assert from "node:assert";
import { randomChoice } from "../src/index.js";

describe("randomChoice", () => {
  it("should return one of items", () => {
    const items = ["apple", "banana", "orange"] as const;
    const randomResult = randomChoice(items);
    assert.ok(items.includes(randomResult));
  });
});
