import { LexerResult, Token } from "lexer";

import { ASTNode } from "../node";

export default class ParserResult implements LexerResult {
  lines: string[];
  tokens: Token[];
  rawInput: string;
  name: string;
  constructor(public readonly root: ASTNode, lexerResult: LexerResult) {
    this.name = lexerResult.name;
    this.lines = lexerResult.lines;
    this.tokens = lexerResult.tokens;
    this.rawInput = lexerResult.rawInput;
  }
}
