const miniClassName = require("../index.js");

describe("Errors", () => {
  const run = (ops) => () => miniClassName(ops);

  it("should be invalid options", () => {
    expect(run(null)).toThrow(TypeError);
  });

  it("should be invalid prefix", () => {
    expect(run({ prefix: null })).toThrow(TypeError);
    expect(run({ prefix: 6 })).toThrow(TypeError);
  });

  it("should be invalid `prefix` char", () => {
    expect(run({ prefix: "x--ß--" })).toThrow(TypeError);
  });

  it("should be invalid first `prefix` char", () => {
    expect(run({ prefix: "5" })).toThrow(TypeError);
    expect(run({ prefix: "-" })).toThrow(TypeError);
  });

  it("should be invalid suffix", () => {
    expect(run({ suffix: null })).toThrow(TypeError);
    expect(run({ suffix: 0 })).toThrow(TypeError);
  });

  it("should be invalid `suffix` char", () => {
    expect(run({ suffix: "--ß" })).toThrow(TypeError);
  });

  it("should be invalid hash", () => {
    expect(run({ hash: null })).toThrow(TypeError);
  });

  it("should be invalid excludePattern", () => {
    expect(run({ excludePattern: "" })).toThrow(TypeError);
    expect(run({ excludePattern: 1 })).toThrow(TypeError);
  });

  // NO ERROR

  it("shouldn't be error, excludePattern is null", () => {
    miniClassName({ excludePattern: null });
  });

  it("shouldn't be error, excludePattern is RegExp", () => {
    miniClassName({ excludePattern: /regex/ });
  });
});
