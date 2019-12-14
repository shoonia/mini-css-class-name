const miniClassName = require("../index.js");

describe("Errors", () => {
  const run = (ops) => () => miniClassName(ops);

  it("should be invalid options", () => {
    expect(run(null)).toThrow(TypeError);
  });

  it("should be invalid prefix", () => {
    expect(run({ prefix: null })).toThrow(TypeError);
  });

  it("should be invalid suffix", () => {
    expect(run({ suffix: null })).toThrow(TypeError);
  });

  it("should be invalid hash", () => {
    expect(run({ hash: null })).toThrow(TypeError);
  });

  it("should be invalid excludePattern", () => {
    expect(run({ excludePattern: "" })).toThrow(TypeError);
  });

  it("shouldn't be error, excludePattern is null", () => {
    miniClassName({ excludePattern: null });
  });

  it("shouldn't be error, excludePattern is RegExp", () => {
    miniClassName({ excludePattern: /regex/ });
  });
});
