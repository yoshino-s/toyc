import { OperatorToken, OperatorType, Token } from "lexer";

import { ParserNode } from "../parser/ParserTree";

import { ExpressionNode, getExpressionNode } from "./expression.node";

export enum BooleanBinaryOperator {
  GT,
  LT,
  GE,
  LE,
  EQ,
}

export class BooleanExpressionNode {
  left: ExpressionNode;
  right: ExpressionNode;
  operator!: BooleanBinaryOperator;
  tokens!: Token[];
  constructor(node: ParserNode) {
    const o = node.children[1].children[0].token;
    this.left = getExpressionNode(node.children[0]);
    this.right = getExpressionNode(node.children[2]);
    const op: any = {
      [OperatorType.EQ]: BooleanBinaryOperator.EQ,
      [OperatorType.GT]: BooleanBinaryOperator.GT,
      [OperatorType.LT]: BooleanBinaryOperator.LT,
      [OperatorType.GE]: BooleanBinaryOperator.GE,
      [OperatorType.LE]: BooleanBinaryOperator.LE,
    };
    if (o instanceof OperatorToken) {
      this.operator = op[o.operator];
    }
    this.tokens = [...this.left.tokens, o, ...this.right.tokens] as Token[];
  }
}
