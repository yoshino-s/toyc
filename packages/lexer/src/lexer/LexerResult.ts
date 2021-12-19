import { LexerContext } from "..";
import Token from "../token/abstract.token";

export interface LexerResultOptions {
  keepIgnoredTokens?: boolean;
}

export default class LexerResult {
  lines: string[];
  tokens: Token[];
  rawInput: string;
  name: string;
  constructor(lexerContext: LexerContext, options?: LexerResultOptions) {
    this.tokens = options?.keepIgnoredTokens
      ? lexerContext.tokens
      : lexerContext.tokens.filter((token) => !token.ignore);
    this.rawInput = lexerContext.input;
    this.lines = lexerContext.lines;
    this.name = lexerContext.name;
  }
}
