import { NumberType } from "lexer";
import { IdentifierTable, ParserResult } from "llparser";

import { EvaluatorError } from "../error";

import AbstractOpCode from "./opcode";

export type VariableTable = Record<
  string,
  {
    type: NumberType;
    value: number;
  }
>;

interface Position {
  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;
}

export default class EvalContext {
  variableTable: VariableTable;
  stack: (number | boolean)[] = [];
  opCodes: AbstractOpCode[];
  pointer = 0;
  position: Position = {
    startRow: 0,
    startColumn: 0,
    endRow: 0,
    endColumn: 0,
  };
  constructor(
    identifierTable: IdentifierTable,
    opCodes: AbstractOpCode[],
    public readonly parserResult: ParserResult
  ) {
    this.variableTable = {};
    this.opCodes = opCodes;
    this.parserResult = parserResult;
    for (const [name, { type, value }] of Object.entries(identifierTable)) {
      this.variableTable[name] = { type, value };
    }
  }
  run() {
    while (this.pointer < this.opCodes.length) {
      const op = this.opCodes[this.pointer++];
      this.position = {
        startRow: Reflect.getMetadata("row", op.relativeNode.tokens[0]),
        startColumn: Reflect.getMetadata("column", op.relativeNode.tokens[0]),
        endRow: Reflect.getMetadata(
          "row",
          op.relativeNode.tokens[op.relativeNode.tokens.length - 1]
        ),
        endColumn: Reflect.getMetadata(
          "column",
          op.relativeNode.tokens[op.relativeNode.tokens.length - 1]
        ),
      };
      op.do(this);
    }
    this.finishCheck();
  }
  finishCheck() {
    if (this.stack.length !== 0) {
      throw new EvaluatorError("Stack is not empty when finish", this);
    }
  }
  setVariable(id: string, value: number) {
    const variable = this.variableTable[id];
    if (!variable) {
      throw new EvaluatorError(`Variable ${id} is not defined`, this);
    }
    if (variable.type === NumberType.INTEGER) {
      if (value > 2 ** 31 - 1 || value < -(2 ** 31)) {
        throw new EvaluatorError("Integer overflow", this);
      }
      this.variableTable[id].value = Math.round(value);
    } else {
      this.variableTable[id].value = value;
    }
  }
  getVariable(id: string) {
    const variable = this.variableTable[id];
    if (!variable) {
      throw new EvaluatorError(`Variable ${id} is not defined`, this);
    }
    return variable.value;
  }
  push(value: number | boolean) {
    this.stack.push(value);
  }
  pop() {
    return this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
}
