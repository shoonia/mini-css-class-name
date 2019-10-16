import assert from "assert";

import miniClassName from "../es6";

describe("Errors (es6)", () => {
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

  it("Invalid prefix char", () => {
    try {
      miniClassName({ prefix: "#" });
    } catch (error) {
      return assert.ok(true);
    }
    assert.fail();
  });

  it("Invalid prefix start char", () => {
    try {
      miniClassName({ prefix: "1abc" });
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

  it("Invalid suffix char", () => {
    try {
      miniClassName({ suffix: "#" });
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
