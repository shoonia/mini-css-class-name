const { array1e5 } = require("./util");

const miniClassName = require("../index.js");

describe("excludePattern", () => {
  it("should be remove underscore and dash", () => {
    const regex = /[_-]/g;
    const generate = miniClassName({ excludePattern: regex });

    array1e5().forEach(() => {
      const className = generate();
      expect(regex.test(className)).toBeFalsy();
    });

    generate.reset();
  });

  it("should be keep only alphabet characters", () => {
    const regex = /[^a-z]/gi;
    const generate = miniClassName({ excludePattern: regex });

    array1e5().forEach(() => {
      const className = generate();
      expect(regex.test(className)).toBeFalsy();
    });

    generate.reset();
  });

  it("should be remove letter `d`", () => {
    const regex = /d/gi;
    const generate = miniClassName({ excludePattern: regex });

    array1e5().forEach(() => {
      const className = generate();
      expect(regex.test(className)).toBeFalsy();
    });

    generate.reset();
  });
});
