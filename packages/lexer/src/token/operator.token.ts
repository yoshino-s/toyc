import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export enum OperatorType {
  ADD = "+",
  SUB = "-",
  MUL = "*",
  DIV = "/",
  ASSIGN = "=",
  EQ = "==",
  GT = ">",
  LE = "<=",
  LT = "<",
  GE = ">=",
}

export default class OperatorToken extends Token {
  public readonly type = TokenType.OPERATOR;
  public readonly operator: OperatorType;
  constructor(operator: string) {
    super();
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
    this.operator = opTable[operator];
  }
  static rule = /\+|-|\*|\/|==|=|<=|>=|<|>/;
  static from(str: string) {
    const token = new OperatorToken(str);
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      this.operator,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
