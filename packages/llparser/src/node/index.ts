import { BooleanExpressionNode } from "./bool.node";
import { ExpressionNode } from "./expression.node";
export * from "./expression.node";
export * from "./statement.node";
import { ProgramNode } from "./program.node";
import { StatementNode } from "./statement.node";

export type ASTNode =
  | BooleanExpressionNode
  | ProgramNode
  | ExpressionNode
  | StatementNode;

export { BooleanExpressionNode, ProgramNode };
