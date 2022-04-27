import toCEP from ".";
import { MaskOptions } from "../../../constants/types";

describe("toCEP", () => {
  const testCases = [
    { value: "", expected: "" },
    { value: "8", expected: "8" },
    { value: "85", expected: "85" },
    { value: "858", expected: "85.8" },
    { value: "8588", expected: "85.88" },
    { value: "85884", expected: "85.884" },
    { value: "858849", expected: "85.884-9" },
    { value: "8588496", expected: "85.884-96" },
    { value: "85884960", expected: "85.884-960" }
  ];
  const testCasesWithPlaceholder = [
    { value: "", expected: "__.___-___" },
    { value: "8", expected: "8_.___-___" },
    { value: "85", expected: "85.___-___" },
    { value: "858", expected: "85.8__-___" },
    { value: "8588", expected: "85.88_-___" },
    { value: "85884", expected: "85.884-___" },
    { value: "858849", expected: "85.884-9__" },
    { value: "8588496", expected: "85.884-96_" },
    { value: "85884960", expected: "85.884-960" }
  ];
  const optionsWithPlaceholder: MaskOptions = {
    placeholderLazyMode: false,
    placeholderChar: "_"
  };

  it.each(testCases)("should return a formatted CEP", ({ value, expected }) => {
    expect(toCEP(value)).toBe(expected);
  });

  it.each(testCasesWithPlaceholder)(
    "should return a formatted CEP when `placeholder` is a `_`",
    ({ value, expected }) => {
      expect(toCEP(value, optionsWithPlaceholder)).toBe(expected);
    }
  );

  it("should remove all non-digit characters from a string", () => {
    const value = "#$%@*!/a1b2c3d4e5f6g7h8i9j1k01$@/";
    const expected = "12.345-678";

    expect(toCEP(value)).toBe(expected);
  });
});
