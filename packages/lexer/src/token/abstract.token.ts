import LexerContext from "../lexer/LexerContext";

import type { TokenType } from "./token.interface";

export type TokenFrom = (str: string, context: LexerContext) => Token;

export default abstract class Token {
  public abstract readonly type: TokenType;
  public static readonly rule: RegExp;
  public static privilege = 0;
  public ignore = false;
  public static from(str: string, context: LexerContext): Token {
    str; //
    context; //
    throw new Error("Method not implemented.");
  }
  public callback(context: LexerContext): void {
    context; //
  }
  public abstract toQuadraple(): [string, string, number, number];
}
