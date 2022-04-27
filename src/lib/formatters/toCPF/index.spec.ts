import toCPF from ".";
import { MaskOptions } from "../../../constants/types";

describe("toCPF", () => {
  const testCases = [
    { value: "", expected: "" },
    { value: "3", expected: "3" },
    { value: "35", expected: "35" },
    { value: "354", expected: "354" },
    { value: "3544", expected: "354.4" },
    { value: "35447", expected: "354.47" },
    { value: "354475", expected: "354.475" },
    { value: "3544756", expected: "354.475.6" },
    { value: "35447567", expected: "354.475.67" },
    { value: "354475670", expected: "354.475.670" },
    { value: "3544756706", expected: "354.475.670-6" },
    { value: "35447567068", expected: "354.475.670-68" }
  ];
  const testCasesWithPlaceholder = [
    { value: "", expected: "___.___.___-__" },
    { value: "3", expected: "3__.___.___-__" },
    { value: "35", expected: "35_.___.___-__" },
    { value: "354", expected: "354.___.___-__" },
    { value: "3544", expected: "354.4__.___-__" },
    { value: "35447", expected: "354.47_.___-__" },
    { value: "354475", expected: "354.475.___-__" },
    { value: "3544756", expected: "354.475.6__-__" },
    { value: "35447567", expected: "354.475.67_-__" },
    { value: "354475670", expected: "354.475.670-__" },
    { value: "3544756706", expected: "354.475.670-6_" },
    { value: "35447567068", expected: "354.475.670-68" }
  ];
  const optionsWithPlaceholder: MaskOptions = {
    placeholderLazyMode: false,
    placeholderChar: "_"
  };

  it.each(testCases)("should return a formatted CPF", ({ value, expected }) => {
    expect(toCPF(value)).toBe(expected);
  });

  it.each(testCasesWithPlaceholder)(
    "should return a formatted CPF when `placeholder` is a `_`",
    ({ value, expected }) => {
      expect(toCPF(value, optionsWithPlaceholder)).toBe(expected);
    }
  );

  it("should remove all non-digit characters from a string", () => {
    const value = "#$%@*!/a1b2c3d4e5f6g7h8i9j0k1";
    const expected = "123.456.789-01";

    expect(toCPF(value)).toBe(expected);
  });
});
