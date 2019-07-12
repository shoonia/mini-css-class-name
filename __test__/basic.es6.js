import assert from "assert";

import miniClassName from "../es6";

describe("Create className (es6)", () => {
  const array1e5 = Array(1e5).fill(null);

  it("100 000 unique className", () => {
    const generate = miniClassName();
    const classList = array1e5.map(() => generate());
    const uniqueList = Array.from(new Set(classList));

    generate.reset();
    assert.equal(classList.length, uniqueList.length);
  });

  it("100 000 unique className with prefix", () => {
    const generate = miniClassName({
      prefix: "prefix--",
    });

    const classList = array1e5.map(() => generate());
    const uniqueList = Array.from(new Set(classList));

    generate.reset();
    assert.equal(classList.length, uniqueList.length);
  });

  it("100 000 unique className with suffix", () => {
    const generate = miniClassName({
      suffix: "--suffix",
    });

    const classList = array1e5.map(() => generate());
    const uniqueList = Array.from(new Set(classList));

    generate.reset();
    assert.equal(classList.length, uniqueList.length);
  });

  it("100 000 unique className with hash", () => {
    const generate = miniClassName({
      hash: 5,
    });

    const classList = array1e5.map(() => generate());
    const uniqueList = Array.from(new Set(classList));

    generate.reset();
    assert.equal(classList.length, uniqueList.length);
  });

  it("100 000 unique className with all options", () => {
    const generate = miniClassName({
      prefix: "prefix--",
      suffix: "--suffix",
      hash: 5,
    });

    const classList = array1e5.map(() => generate());
    const uniqueList = Array.from(new Set(classList));

    generate.reset();
    assert.equal(classList.length, uniqueList.length);
  });

  it("Valid first character class name", () => {
    const generate = miniClassName();

    array1e5.forEach(() => {
      const className = generate();
      assert.equal(/[^a-z_]/i.test(className[0]), false);
    });
  });
});
