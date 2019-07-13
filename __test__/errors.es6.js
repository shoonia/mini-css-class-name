import assert from "assert";

import miniClassName from "../es6/miniClassNames";

describe("Errors (es6)", () => {
  it("Invalid ops", () => {
    try {
      miniClassName(null);
      throw new Error();
    } catch (error) {
      assert.equal(error instanceof TypeError, true);
    }
  });

  it("Invalid prefix", () => {
    try {
      miniClassName({ prefix: null });
      throw new Error();
    } catch (error) {
      assert.equal(error instanceof TypeError, true);
    }
  });

  it("Invalid suffix", () => {
    try {
      miniClassName({ suffix: null });
      throw new Error();
    } catch (error) {
      assert.equal(error instanceof TypeError, true);
    }
  });

  it("Invalid hash", () => {
    try {
      miniClassName({ hash: null });
      throw new Error();
    } catch (error) {
      assert.equal(error instanceof TypeError, true);
    }
  });
});
