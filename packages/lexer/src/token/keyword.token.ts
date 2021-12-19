import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export enum KeywordType {
  IF = "if",
  THEN = "then",
  ELSE = "else",
  WHILE = "while",
  INT = "int",
  REAL = "real",
}

export default class KeywordToken extends Token {
  public readonly type = TokenType.KEYWORD;
  public static readonly privilege = 1;
  public readonly keyword: KeywordType;
  constructor(keyword: string) {
    super();
    const keywordTable: Record<string, KeywordType> = {
      if: KeywordType.IF,
      then: KeywordType.THEN,
      else: KeywordType.ELSE,
      while: KeywordType.WHILE,
      int: KeywordType.INT,
      real: KeywordType.REAL,
    };
    this.keyword = keywordTable[keyword];
  }
  static rule = /\b(?:if|then|else|while|int|real)\b/;
  static from(str: string) {
    const token = new KeywordToken(str as KeywordType);
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      this.keyword,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
