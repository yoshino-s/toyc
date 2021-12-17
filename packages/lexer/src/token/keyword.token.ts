import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export type KeyWordType = "if" | "then" | "else" | "while";

export default class KeywordToken<K extends KeyWordType> extends Token {
  public readonly type = TokenType.KEYWORD;
  public static readonly privilege = 1;
  constructor(public readonly keyword: K) {
    super();
  }
  static rule = /\b(?:if|then|else|while)\b/;
  static from(str: string) {
    const token = new KeywordToken(str as KeyWordType);
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
