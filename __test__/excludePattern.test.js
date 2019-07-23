import assert from "assert";

import miniClassName from "../index.js";

describe("excludePattern", () => {
  const array1e5 = Array(1e5).fill(null);

  it("remove underscore and dash", () => {
    const regex = /[_-]/g;
    const generate = miniClassName({ excludePattern: regex });

    array1e5.forEach(() => {
      const className = generate();
      assert.equal(regex.test(className), false);
    });

    generate.reset();
  });

  it("keep only alphabet characters", () => {
    const regex = /[^a-z]/gi;
    const generate = miniClassName({ excludePattern: regex });

    array1e5.forEach(() => {
      const className = generate();
      assert.equal(regex.test(className), false);
    });

    generate.reset();
  });

  it("remove letter `d`", () => {
    const regex = /d/gi;
    const generate = miniClassName({ excludePattern: regex });

    array1e5.forEach(() => {
      const className = generate();
      assert.equal(regex.test(className), false);
    });

    generate.reset();
  });
});
