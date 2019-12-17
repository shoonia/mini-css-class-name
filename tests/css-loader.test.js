const createLocalIdent = require("../css-loader");

const mockContext = {
  resourcePath: "/app/doc/test.css"
};

const mockLoader = (getLocalIdent) => {
  return (localName) => getLocalIdent(mockContext, null, localName);
};

describe("css-loader", () => {
  it("should return equal class names", () => {
    const run = mockLoader(createLocalIdent());
    const localName = "test";

    expect(run(localName)).toBe(run(localName));
    expect(run(localName)).toBe(run(localName));
  });

  it("should return NOT equal class names", () => {
    const run = mockLoader(createLocalIdent());

    expect(run("x")).not.toBe(run("y"));
  });
});
