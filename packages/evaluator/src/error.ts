import EvalContext from "./eval/EvalContext";

export class EvaluatorError extends Error {
  reason: string;
  context: EvalContext;

  constructor(reason: string, context: EvalContext) {
    super();
    this.reason = reason;
    this.message = `${this.reason} At ${context.parserResult.name}[${context.position.startRow}:${context.position.startColumn}]\n
Stack: ${context.stack}`;
    this.context = context;
  }
}
