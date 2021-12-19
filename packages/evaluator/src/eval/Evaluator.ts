import { ParserResult, ProgramNode } from "llparser";

import Compiler from "./Compiler";
import EvalContext from "./EvalContext";

export default class Evaluator {
  eval(parserResult: ParserResult) {
    if (!(parserResult.root instanceof ProgramNode)) {
      throw new Error("Expected ProgramNode");
    }
    const compiler = new Compiler();
    const code = compiler.compileProgram(parserResult.root);
    const context = new EvalContext(
      parserResult.root.identifierTable,
      code,
      parserResult
    );
    context.run();
    return context.variableTable;
  }
}
