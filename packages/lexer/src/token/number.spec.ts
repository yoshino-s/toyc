import { expectLexTo, expectLexToError } from "../spec.utils";

import NumberToken, { NumberType } from "./number.token";

describe("Identifier Token", () => {
  const expectLexToBeNumber = (
    inp: string,
    type: NumberType,
    value: number
  ) => {
    expectLexTo(inp, NumberToken, (t) => {
      expect(t.numberType).toBe(type);
      expect(t.number).toBe(value);
    });
  };
  it("should lex a identifier", () => {
    expectLexToBeNumber("123456", NumberType.INTEGER, 123456);
    expectLexToBeNumber("123456e7", NumberType.REAL, 123456e7);
    expectLexToBeNumber("123456e+7", NumberType.REAL, 123456e7);
    expectLexToBeNumber("123456e-7", NumberType.REAL, 123456e-7);
    expectLexToBeNumber("123.456", NumberType.REAL, 123.456);
    expectLexToBeNumber("123.456e7", NumberType.REAL, 123.456e7);
    expectLexToBeNumber("123.456e+7", NumberType.REAL, 123.456e7);
    expectLexToBeNumber("123.456e-7", NumberType.REAL, 123.456e-7);

    expectLexTo((2 ** 32).toString(), NumberToken);
    expectLexToError((2 ** 32 + 1).toString(), NumberToken);
    expectLexTo("2e128", NumberToken);
    expectLexToError("2e129", NumberToken);
  });
});
