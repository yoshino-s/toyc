import {
  TokenType,
  NumberType,
  NumberToken,
  OperatorToken,
  IdentifierToken,
  OperatorType,
  Token,
} from "lexer";

import { ParserNode } from "../parser/ParserTree";
import { RuleType } from "../rules/interface.rule";

export class PrimitiveExpressionNode {
  value!: number;
  tokens!: Token[];
  constructor(node: ParserNode) {
    if (node.token instanceof NumberToken) {
      this.value = node.token.number;
      this.tokens = [node.token];
    }
  }
}

export class IdentifierExpressionNode {
  identifier!: string;
  tokens!: Token[];
  constructor(node: ParserNode) {
    if (node.token instanceof IdentifierToken) {
      this.identifier = node.token.identifier;
      this.tokens = [node.token];
    }
  }
}

export enum BinaryOperator {
  ADD = "ADD",
  SUB = "SUB",
  MUL = "MUL",
  DIV = "DIV",
}

export class BinaryExpressionNode {
  tokens!: Token[];
  constructor(
    public readonly left: ExpressionNode,
    public readonly right: ExpressionNode,
    public readonly operator: BinaryOperator,
    opToken: OperatorToken
  ) {
    this.tokens = [...left.tokens, opToken, ...right.tokens];
  }
}

function getBinaryExpressionNode(node: ParserNode): ExpressionNode {
  let left = getExpressionNode(node.children[0]);
  let prime = node.children[1]; // MULTIEXPRPRIME
  while (prime.children.length) {
    const operator = prime.children[0].token as OperatorToken;
    const right = getExpressionNode(prime.children[1]);
    const op: any = {
      [OperatorType.ADD]: BinaryOperator.ADD,
      [OperatorType.SUB]: BinaryOperator.SUB,
      [OperatorType.MUL]: BinaryOperator.MUL,
      [OperatorType.DIV]: BinaryOperator.DIV,
    };
    left = new BinaryExpressionNode(
      left,
      right,
      op[operator.operator],
      operator
    );
    prime = prime.children[2];
  }
  return left;
}

export function getExpressionNode(node: ParserNode): ExpressionNode {
  switch (node.symbol) {
    case TokenType.IDENTIFIER:
      return new IdentifierExpressionNode(node);
    case NumberType.INTEGER:
    case NumberType.REAL:
      return new PrimitiveExpressionNode(node);
    case RuleType.SIMPLEEXPR:
      if (node.children.length === 1) {
        return getExpressionNode(node.children[0]);
      } else {
        return getExpressionNode(node.children[2]); // ( expr )
      }
    case RuleType.MULTIEXPR:
    case RuleType.ARITHEXPR:
      return getBinaryExpressionNode(node);
    default:
      throw new Error(`Unsupported expression node: ${String(node.symbol)}`);
  }
}

export type ExpressionNode =
  | PrimitiveExpressionNode
  | IdentifierExpressionNode
  | BinaryExpressionNode;
