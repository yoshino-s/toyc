import LexerContext from "./lexer/LexerContext";

export class LexerError extends Error {
  reason: string;
  constructor(reason: string, context: LexerContext) {
    super();
    this.reason = reason;
    this.message = `${this.reason} At ${context.name}:${context.column}:${
      context.row
    }
${context.currentLine}
${"^".padStart(context.column + 1, " ")}`;
  }
}
