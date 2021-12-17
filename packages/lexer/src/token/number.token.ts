import { LexerError } from "../error";
import LexerContext from "../lexer/LexerContext";

import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export enum NumberType {
  INTEGER = "integer",
  REAL = "real",
}

export default class NumberToken extends Token {
  public readonly type = TokenType.NUMBER;
  public readonly numberType: NumberType;
  constructor(public readonly number: number, type?: NumberType) {
    super();
    this.numberType =
      type ?? (Number.isInteger(number) ? NumberType.INTEGER : NumberType.REAL);
  }
  static rule =
    /\b(?:(?<real>\d+(E|e)(?:\+|-)?(?<exp0>\d+)|\d+\.\d+(?:(?:E|e)(?:\+|-)?(?<exp1>\d+))?)|(?<int>\d+))\b/;
  static from(str: string, context: LexerContext) {
    const result = NumberToken.rule.exec(str);
    if (result?.groups?.int) {
      const number = parseInt(result.groups.int);
      if (number > 2 ** 32) {
        throw new LexerError("Number is too large", context);
      }
      const token = new NumberToken(number, NumberType.INTEGER);
      return token;
    } else if (result?.groups?.real) {
      const exponent = parseInt(
        result?.groups.exp0 ?? result?.groups.exp1 ?? "0"
      );
      if (exponent > 128) {
        throw new LexerError("Exponent is too large", context);
      }
      const number = parseFloat(result.groups.real);
      const token = new NumberToken(number, NumberType.REAL);
      return token;
    } else {
      throw new LexerError("This should not happen", context);
    }
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      `${this.numberType} ${this.number}`,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
