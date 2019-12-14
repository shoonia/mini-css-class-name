const miniClassName = require("../index.js");

describe("Errors", () => {
  const run = (ops) => () => miniClassName(ops);

  it("Invalid ops", () => {
    expect(run(null)).toThrow(TypeError);
  });

  it("Invalid prefix", () => {
    expect(run({ prefix: null })).toThrow(TypeError);
  });

  it("Invalid suffix", () => {
    expect(run({ suffix: null })).toThrow(TypeError);
  });

  it("Invalid hash", () => {
    expect(run({ hash: null })).toThrow(TypeError);
  });

  it("Invalid excludePattern", () => {
    expect(run({ excludePattern: "" })).toThrow(TypeError);
  });

  it("excludePattern is null", () => {
    miniClassName({ excludePattern: null });
  });

  it("excludePattern is RegExp", () => {
    miniClassName({ excludePattern: /regex/ });
  });
});
