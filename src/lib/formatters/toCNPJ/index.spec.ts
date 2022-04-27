import toCNPJ from ".";
import { MaskOptions } from "../../../constants/types";

describe("toCNPJ", () => {
  const testCases = [
    { value: "", expected: "" },
    { value: "8", expected: "8" },
    { value: "85", expected: "85" },
    { value: "858", expected: "85.8" },
    { value: "8588", expected: "85.88" },
    { value: "85884", expected: "85.884" },
    { value: "858849", expected: "85.884.9" },
    { value: "8588496", expected: "85.884.96" },
    { value: "85884960", expected: "85.884.960" },
    { value: "858849600", expected: "85.884.960/0" },
    { value: "8588496000", expected: "85.884.960/00" },
    { value: "85884960000", expected: "85.884.960/000" },
    { value: "858849600001", expected: "85.884.960/0001" },
    { value: "8588496000011", expected: "85.884.960/0001-1" },
    { value: "85884960000114", expected: "85.884.960/0001-14" }
  ];
  const testCasesWithPlaceholder = [
    { value: "", expected: "__.___.___/____-__" },
    { value: "8", expected: "8_.___.___/____-__" },
    { value: "85", expected: "85.___.___/____-__" },
    { value: "858", expected: "85.8__.___/____-__" },
    { value: "8588", expected: "85.88_.___/____-__" },
    { value: "85884", expected: "85.884.___/____-__" },
    { value: "858849", expected: "85.884.9__/____-__" },
    { value: "8588496", expected: "85.884.96_/____-__" },
    { value: "85884960", expected: "85.884.960/____-__" },
    { value: "858849600", expected: "85.884.960/0___-__" },
    { value: "8588496000", expected: "85.884.960/00__-__" },
    { value: "85884960000", expected: "85.884.960/000_-__" },
    { value: "858849600001", expected: "85.884.960/0001-__" },
    { value: "8588496000011", expected: "85.884.960/0001-1_" },
    { value: "85884960000114", expected: "85.884.960/0001-14" }
  ];
  const optionsWithPlaceholder: MaskOptions = {
    placeholderLazyMode: false,
    placeholderChar: "_"
  };

  it.each(testCases)(
    "should return a formatted CNPJ",
    ({ value, expected }) => {
      expect(toCNPJ(value)).toBe(expected);
    }
  );

  it.each(testCasesWithPlaceholder)(
    "should return a formatted CNPJ when `placeholder` is a `_`",
    ({ value, expected }) => {
      expect(toCNPJ(value, optionsWithPlaceholder)).toBe(expected);
    }
  );

  it("should remove all non-digit characters from a string", () => {
    const value = "#$%@*!/a1b2c3d4e5f6g7h8i9j1k0101$@/";
    const expected = "12.345.678/9101-01";

    expect(toCNPJ(value)).toBe(expected);
  });
});
