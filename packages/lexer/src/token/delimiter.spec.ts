import { expectLexTo } from "../spec.utils";

import OperatorToken, { OperatorType } from "./operator.token";

describe("Operator Token", () => {
  it("should lex a comment", () => {
    const opTable: Record<string, OperatorType> = {
      "+": OperatorType.ADD,
      "-": OperatorType.SUB,
      "*": OperatorType.MUL,
      "/": OperatorType.DIV,
      "=": OperatorType.ASSIGN,
      "==": OperatorType.EQ,
      ">": OperatorType.GT,
      "<": OperatorType.LT,
      ">=": OperatorType.GE,
      "<=": OperatorType.LE,
    };
    Object.entries(opTable).forEach(([op, type]) => {
      expectLexTo(op, OperatorToken, (t) => expect(t.operator).toBe(type));
    });
  });
});
