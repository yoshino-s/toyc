import { ASTNode } from "llparser";

import { EvaluatorError } from "../error";

import EvalContext from "./EvalContext";

export enum OpCode {
  PUT, // PUT ID, let ID = top of stack and remove top
  GET, // GET ID, push ID value to stack
  PUSH, // PUSH VALUE, push VALUE to stack
  POP, // POP, remove top of stack
  GOTO, // GOTO LINE, jump to LINE, relative
  ADD, // ADD, ADD top two values and push result to stack
  SUB, // SUB, SUB top two values and push result to stack
  MUL, // MUL, MUL top two values and push result to stack
  DIV, // DIV, DIV top two values and push result to stack
  EQ, // EQ, test top two values for equality and push result to stack
  GT, // GT, test top two values for greater than and push result to stack
  LT, // LT, test top two values for less than and push result to stack
  GE, // GE, test top two values for greater than or equal and push result to stack
  LE, // LE, test top two values for less than or equal and push result to stack
  COND_GOTO, // COND_GOTO LINE, if top of stack is true then goto LINE, or run next, relative
  NCOND_GOTO, // COND_GOTO LINE, if top of stack is true then goto LINE, or run next, relative
  NOP, // NOP, do nothing
  CHK, // CHK, check stack empty
}

export default abstract class AbstractOpCode {
  abstract code: OpCode;
  constructor(public readonly relativeNode: ASTNode) {}
  abstract do(context: EvalContext): void;
  abstract toString(): string;
}

export class OpCodePUT extends AbstractOpCode {
  code = OpCode.PUT;
  constructor(public id: string, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    const value = context.pop();
    if (typeof value === "number") {
      context.setVariable(this.id, value);
    } else {
      throw new EvalError(`Cannot assign boolean value to variable ${this.id}`);
    }
  }
  toString() {
    return `PUT ${this.id}`;
  }
}

export class OpCodeGET extends AbstractOpCode {
  code = OpCode.GET;
  constructor(public id: string, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    context.push(context.getVariable(this.id));
  }
  toString(): string {
    return `GET ${this.id}`;
  }
}

export class OpCodePUSH extends AbstractOpCode {
  code = OpCode.PUSH;
  constructor(public value: number | boolean, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    context.push(this.value);
  }
  toString(): string {
    return `PUSH ${this.value}`;
  }
}

export class OpCodePOP extends AbstractOpCode {
  code = OpCode.POP;
  constructor(relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    context.pop();
  }
  toString(): string {
    return "POP";
  }
}

export class OpCodeGOTO extends AbstractOpCode {
  code = OpCode.GOTO;
  constructor(public line: number, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    context.pointer = context.pointer - 1 + this.line;
  }
  toString(): string {
    return `GOTO ${this.line}`;
  }
}

export class OpCodeADD extends AbstractOpCode {
  code = OpCode.ADD;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a + b);
    } else {
      throw new EvaluatorError(`Cannot add ${a} and ${b}`, context);
    }
  }
  toString(): string {
    return "ADD";
  }
}

export class OpCodeSUB extends AbstractOpCode {
  code = OpCode.SUB;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a - b);
    } else {
      throw new EvalError(`Cannot subtract ${a} and ${b}`);
    }
  }
  toString(): string {
    return "SUB";
  }
}

export class OpCodeMUL extends AbstractOpCode {
  code = OpCode.MUL;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a * b);
    } else {
      throw new EvalError(`Cannot multiply ${a} and ${b}`);
    }
  }
  toString(): string {
    return "MUL";
  }
}

export class OpCodeDIV extends AbstractOpCode {
  code = OpCode.DIV;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      try {
        context.push(a / b);
      } catch (e) {
        throw new EvalError("Division by zero");
      }
    } else {
      throw new EvalError(`Cannot divide ${a} and ${b}`);
    }
  }
  toString(): string {
    return "DIV";
  }
}

export class OpCodeEQ extends AbstractOpCode {
  code = OpCode.EQ;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a === b);
    } else {
      throw new EvalError(`Cannot test equality of ${a} and ${b}`);
    }
  }
  toString(): string {
    return "EQ";
  }
}

export class OpCodeGT extends AbstractOpCode {
  code = OpCode.GT;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a > b);
    } else {
      throw new EvalError(`Cannot test greater than of ${a} and ${b}`);
    }
  }
  toString(): string {
    return "GT";
  }
}

export class OpCodeLT extends AbstractOpCode {
  code = OpCode.LT;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a < b);
    } else {
      throw new EvalError(`Cannot test less than of ${a} and ${b}`);
    }
  }
  toString(): string {
    return "LT";
  }
}

export class OpCodeGE extends AbstractOpCode {
  code = OpCode.GE;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a >= b);
    } else {
      throw new EvalError(`Cannot test greater than or equal of ${a} and ${b}`);
    }
  }
  toString(): string {
    return "GE";
  }
}

export class OpCodeLE extends AbstractOpCode {
  code = OpCode.LE;
  do(context: EvalContext) {
    const a = context.pop();
    const b = context.pop();
    if (typeof a === "number" && typeof b === "number") {
      context.push(a <= b);
    } else {
      throw new EvalError(`Cannot test less than or equal of ${a} and ${b}`);
    }
  }
  toString(): string {
    return "LE";
  }
}

export class OpCodeCOND_GOTO extends AbstractOpCode {
  code = OpCode.COND_GOTO;
  constructor(public line: number, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    const condition = context.pop();
    if (condition) {
      context.pointer = context.pointer - 1 + this.line;
    }
  }
  toString(): string {
    return `COND_GOTO ${this.line}`;
  }
}

export class OpCodeNCOND_GOTO extends AbstractOpCode {
  code = OpCode.NCOND_GOTO;
  constructor(public line: number, relativeNode: ASTNode) {
    super(relativeNode);
  }
  do(context: EvalContext) {
    const condition = context.pop();
    if (!condition) {
      context.pointer = context.pointer - 1 + this.line;
    }
  }
  toString(): string {
    return `NCOND_GOTO ${this.line}`;
  }
}

export class OpCodeNOP extends AbstractOpCode {
  code = OpCode.NOP;
  do(context: EvalContext) {
    context;
    // do nothing
  }
  toString(): string {
    return "NOP";
  }
}

export class OpCodeCHK extends AbstractOpCode {
  code = OpCode.CHK;
  do(context: EvalContext) {
    if (context.stack.length !== 0) {
      throw new EvalError("Stack not empty");
    }
  }
  toString(): string {
    return "CHK";
  }
}
