import { LexerResult } from "lexer";

import ParserContext from "./parser/ParserContext";
import { RuleSymbol } from "./rules/interface.rule";

export class ParserError extends Error {
  reason: string;
  parserStack?: RuleSymbol[];
  constructor(reason: string, context?: ParserContext) {
    super();
    this.reason = reason;
    if (!context) {
      this.message = `${reason} When constructing parser`;
    } else {
      this.message = `${reason} At ${context.lexerResult.name}:${context.row}:${
        context.column
      }
${context.lexerResult.lines[context.row]}
${"^".padStart(context.column + 1, " ")}`;
      this.parserStack = context.stack;
    }
  }
}
