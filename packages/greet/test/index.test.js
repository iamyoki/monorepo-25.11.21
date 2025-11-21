import assert from "node:assert";
import { describe, it } from "node:test";
import { greet } from "../src/index.js";

describe("greet", () => {
  it("should return hello world", () => {
    assert.strictEqual(greet(), "hello world");
  });
});
