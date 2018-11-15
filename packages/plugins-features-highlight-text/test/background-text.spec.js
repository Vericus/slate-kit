/**
 * Dependencies.
 */

import { KeyUtils } from "slate";

/**
 * Tests.
 */

describe("background-text", () => {
  require("./background-changes");
});

describe("colored-text", () => {
  require("./colored-changes");
});

/**
 * Reset Slate's internal key generator state before each text.
 */

beforeEach(() => {
  KeyUtils.resetGenerator();
});
