import "reflect-metadata";

import { LexerError } from "../error";
import Token, { TokenFrom } from "../token/abstract.token";

import LexerContext from "./LexerContext";
import LexerResult, { LexerResultOptions } from "./LexerResult";

export interface LexerOptions {
  name?: string;
}

export default class Lexer {
  tokens: { rule: RegExp; from: TokenFrom; privilege: number }[] = [];
  public addToken(token: { rule: RegExp; from: TokenFrom; privilege: number }) {
    this.tokens.push(token);
    this.tokens.sort((a, b) => b.privilege - a.privilege);
  }
  public lex(
    input: string,
    options?: LexerResultOptions & LexerOptions
  ): LexerResult {
    const context = new LexerContext(this, input, options?.name);
    while (context.index < input.length) {
      this.scan(context);
    }
    return new LexerResult(context, options);
  }
  private scan(context: LexerContext): Token {
    const index = context.index;
    const input = context.input.slice(index);
    for (const { rule, from } of this.tokens) {
      const match = rule.exec(input);
      if (match && match.index === 0) {
        const [str] = match;
        const token = from(str, context);
        context.tokens.push(token);
        Reflect.defineMetadata("raw", str, token);
        Reflect.defineMetadata("index", index, token);
        Reflect.defineMetadata("row", context.row, token);
        Reflect.defineMetadata("column", context.column, token);
        context.index += str.length;
        Array.from(str).forEach((c) => {
          if (c === "\n") {
            context.row++;
            context.column = 0;
          } else {
            context.column++;
          }
        });
        return token;
      }
    }
    throw new LexerError("Unknown character", context);
  }
}
