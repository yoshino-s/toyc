import {
  ProgramNode,
  AssignmentStatementNode,
  IfStatementNode,
  PrimitiveExpressionNode,
  IdentifierExpressionNode,
  BinaryExpressionNode,
  BinaryOperator,
  ExpressionNode,
  BooleanExpressionNode,
  StatementNode,
  WhileStatementNode,
  CompoundStatementNode,
} from "llparser";
import { BooleanBinaryOperator } from "llparser/dist/node/bool.node";

import AbstractOpCode, {
  OpCodeADD,
  OpCodeEQ,
  OpCodeGE,
  OpCodeGT,
  OpCodeLE,
  OpCodeLT,
  OpCodeGET,
  OpCodePUSH,
  OpCodePUT,
  OpCodeSUB,
  OpCodeMUL,
  OpCodeDIV,
  OpCodeCOND_GOTO,
  OpCodeNCOND_GOTO,
  OpCodeGOTO,
  OpCodeCHK,
} from "./opcode";

export default class Compiler {
  compileProgram(node: ProgramNode) {
    const code = [
      ...this.compileStatement(node.statements),
      new OpCodeCHK(node),
    ];
    return code;
  }
  compilePrimitiveExpression(node: PrimitiveExpressionNode): AbstractOpCode[] {
    return [new OpCodePUSH(node.value, node)];
  }
  compileIdentifier(node: IdentifierExpressionNode): AbstractOpCode[] {
    return [new OpCodeGET(node.identifier, node)];
  }
  compileBinaryExpression(node: BinaryExpressionNode): AbstractOpCode[] {
    const code = [
      ...this.compileExpression(node.right),
      ...this.compileExpression(node.left),
    ];
    switch (node.operator) {
      case BinaryOperator.ADD:
        code.push(new OpCodeADD(node));
        break;
      case BinaryOperator.SUB:
        code.push(new OpCodeSUB(node));
        break;
      case BinaryOperator.MUL:
        code.push(new OpCodeMUL(node));
        break;
      case BinaryOperator.DIV:
        code.push(new OpCodeDIV(node));
        break;
    }
    return code;
  }
  compileExpression(node: ExpressionNode): AbstractOpCode[] {
    if (node instanceof BinaryExpressionNode) {
      return this.compileBinaryExpression(node);
    } else if (node instanceof PrimitiveExpressionNode) {
      return this.compilePrimitiveExpression(node);
    } else if (node instanceof IdentifierExpressionNode) {
      return this.compileIdentifier(node);
    } else {
      throw new Error("Unknown expression node");
    }
  }
  compileBooleanExpression(node: BooleanExpressionNode): AbstractOpCode[] {
    const code = [
      ...this.compileExpression(node.right),
      ...this.compileExpression(node.left),
    ];
    switch (node.operator) {
      case BooleanBinaryOperator.EQ:
        code.push(new OpCodeEQ(node));
        break;
      case BooleanBinaryOperator.GE:
        code.push(new OpCodeGE(node));
        break;
      case BooleanBinaryOperator.GT:
        code.push(new OpCodeGT(node));
        break;
      case BooleanBinaryOperator.LE:
        code.push(new OpCodeLE(node));
        break;
      case BooleanBinaryOperator.LT:
        code.push(new OpCodeLT(node));
        break;
      default:
        throw new Error("Unknown boolean operator");
    }
    return code;
  }
  compileAssignmentStatement(node: AssignmentStatementNode): AbstractOpCode[] {
    return [
      ...this.compileExpression(node.expression),
      new OpCodePUT(node.identifier, node),
    ];
  }
  compileIfStatement(node: IfStatementNode): AbstractOpCode[] {
    const elseCode = this.compileStatement(node.elseBody);
    const code = [
      ...this.compileBooleanExpression(node.condition),
      new OpCodeCOND_GOTO(elseCode.length + 1, node),
      ...elseCode,
      ...this.compileStatement(node.thenBody),
    ];
    return code;
  }
  compileWhileStatement(node: WhileStatementNode): AbstractOpCode[] {
    const bodyCode = this.compileStatement(node.body);
    const condCode = this.compileBooleanExpression(node.condition);
    return [
      ...this.compileBooleanExpression(node.condition),
      new OpCodeNCOND_GOTO(bodyCode.length + 2, node),
      ...bodyCode,
      new OpCodeGOTO(-bodyCode.length - condCode.length - 1, node),
    ];
  }
  compileCompoundStatement(node: CompoundStatementNode): AbstractOpCode[] {
    return node.statements.reduce<AbstractOpCode[]>((acc, statement) => {
      return [...acc, ...this.compileStatement(statement)];
    }, []);
  }
  compileStatement(node: StatementNode): AbstractOpCode[] {
    if (node instanceof IfStatementNode) {
      return this.compileIfStatement(node);
    } else if (node instanceof WhileStatementNode) {
      return this.compileWhileStatement(node);
    } else if (node instanceof AssignmentStatementNode) {
      return this.compileAssignmentStatement(node);
    } else if (node instanceof CompoundStatementNode) {
      return this.compileCompoundStatement(node);
    } else {
      throw new Error("Unknown statement node");
    }
  }
}
