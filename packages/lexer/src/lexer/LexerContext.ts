import Token from "../token/abstract.token";

import Lexer from "./Lexer";

export default class LexerContext {
  row = 0;
  column = 0;
  index = 0;
  lines: string[];
  tokens: Token[] = [];
  constructor(
    public readonly lexer: Lexer,
    public readonly input: string,
    public readonly name: string = "<input>"
  ) {
    this.lines = input.split("\n");
  }
  updatePosition(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  get currentLine() {
    return this.lines[this.row];
  }
}
