import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export enum DelimiterType {
  LEFT_PAREN = "(",
  RIGHT_PAREN = ")",
  LEFT_BRACE = "{",
  RIGHT_BRACE = "}",
  COMMA = ",",
  SEMI = ";",
}

export default class DelimiterToken extends Token {
  public readonly type = TokenType.DELIMITER;
  public readonly delimiter: DelimiterType;
  constructor(delimiter: string) {
    super();
    const delimiterTable: Record<string, DelimiterType> = {
      "(": DelimiterType.LEFT_PAREN,
      ")": DelimiterType.RIGHT_PAREN,
      "{": DelimiterType.LEFT_BRACE,
      "}": DelimiterType.RIGHT_BRACE,
      ",": DelimiterType.COMMA,
      ";": DelimiterType.SEMI,
    };
    this.delimiter = delimiterTable[delimiter];
  }
  static rule = /\(|\)|{|}|,|;/;
  static from(str: string) {
    const token = new DelimiterToken(str);
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      this.delimiter,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
