export { EvaluatorError } from "./error";
import Compiler from "./eval/Compiler";
import EvalContext from "./eval/EvalContext";
import Evaluator from "./eval/Evaluator";
import * as opcode from "./eval/opcode";
export * from "./eval/opcode";
import AbstractOpCode from "./eval/opcode";

export { Evaluator, EvalContext, Compiler, AbstractOpCode, opcode };
export default Evaluator;
