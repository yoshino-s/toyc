import { LexerError } from "../error";
import LexerContext from "../lexer/LexerContext";

import Token from "./abstract.token";
import KeywordToken from "./keyword.token";
import { TokenType } from "./token.interface";

export default class IdentifierToken extends Token {
  public readonly type = TokenType.IDENTIFIER;
  public readonly identifier: string;
  constructor(identifier: string) {
    super();
    this.identifier = identifier;
  }
  static rule = /\b[a-zA-Z][A-Za-z0-9]*\b/;
  static from(str: string, context: LexerContext) {
    const keywordRule = KeywordToken.rule;
    if (keywordRule.exec(str)) {
      throw new LexerError("Cannot use keyword as identifier", context);
    }
    if (str.length > 64) {
      throw new LexerError("Identifier is too long", context);
    }
    const token = new IdentifierToken(str);
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      this.identifier,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
