import assert from "assert";

import miniClassName from "../es6";

describe("Errors (es6)", () => {
  it("Invalid ops", () => {
    try {
      miniClassName(null);
      throw new Error();
    } catch (error) {
      assert.ok(error instanceof TypeError);
    }
  });

  it("Invalid prefix", () => {
    try {
      miniClassName({ prefix: null });
      throw new Error();
    } catch (error) {
      assert.ok(error instanceof TypeError);
    }
  });

  it("Invalid suffix", () => {
    try {
      miniClassName({ suffix: null });
      throw new Error();
    } catch (error) {
      assert.ok(error instanceof TypeError);
    }
  });

  it("Invalid hash", () => {
    try {
      miniClassName({ hash: null });
      throw new Error();
    } catch (error) {
      assert.ok(error instanceof TypeError);
    }
  });

  it("Invalid safe", () => {
    try {
      miniClassName({ safe: null });
      throw new Error();
    } catch (error) {
      assert.ok(error instanceof TypeError);
    }
  });
});
