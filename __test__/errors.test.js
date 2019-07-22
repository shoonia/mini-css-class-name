import assert from "assert";

import miniClassName from "../index.js";

describe("Errors", () => {
  it("Invalid ops", () => {
    try {
      miniClassName(null);
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("Invalid prefix", () => {
    try {
      miniClassName({ prefix: null });
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("Invalid suffix", () => {
    try {
      miniClassName({ suffix: null });
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("Invalid hash", () => {
    try {
      miniClassName({ hash: null });
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("Invalid excludePattern", () => {
    try {
      miniClassName({ excludePattern: "" });
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("excludePattern is null", () => {
    miniClassName({ excludePattern: null });
    assert.ok(true);
  });

  it("excludePattern is RegExp", () => {
    miniClassName({ excludePattern: /regex/ });
    assert.ok(true);
  });
});
