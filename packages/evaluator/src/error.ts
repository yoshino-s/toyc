import EvalContext from "./eval/EvalContext";

export class EvaluatorError extends Error {
  reason: string;

  constructor(reason: string, context: EvalContext) {
    super();
    this.reason = reason;
    this.message = `${this.reason} At ${context.parserResult.name}:${
      context.position.startRow
    }:${context.position.startColumn}
${context.parserResult.lines[context.position.startRow]}
${"^".padStart(context.position.startColumn + 1, " ")}
Stack: ${context.stack}`;
  }
}
