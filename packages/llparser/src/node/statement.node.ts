import { IdentifierToken, Token } from "lexer";

import { ParserNode } from "../parser/ParserTree";
import { RuleType } from "../rules/interface.rule";

import { BooleanExpressionNode } from "./bool.node";
import { ExpressionNode, getExpressionNode } from "./expression.node";

export class CompoundStatementNode {
  statements: StatementNode[];
  tokens: Token[] = [];
  constructor(node: ParserNode) {
    const statements = [];
    this.tokens.push(node.children[0].token as Token);
    const end_brace = node.children[2].token as Token;
    node = node.children[1];
    while (node.children.length) {
      const statement = getStatementNode(node.children[0]);
      statements.push(statement);
      this.tokens.push(...statement.tokens);
      node = node.children[1];
    }
    this.tokens.push(end_brace);
    this.statements = statements;
  }
}

export class IfStatementNode {
  condition: BooleanExpressionNode;
  thenBody: StatementNode;
  elseBody: StatementNode;
  tokens: Token[] = [];
  constructor(node: ParserNode) {
    this.condition = new BooleanExpressionNode(node.children[2]);
    this.thenBody = getStatementNode(node.children[5]);
    this.elseBody = getStatementNode(node.children[7]);
    this.tokens = [
      node.children[0].token,
      node.children[1].token,
      ...this.condition.tokens,
      node.children[3].token,
      node.children[4].token,
      ...this.thenBody.tokens,
      node.children[6].token,
      ...this.elseBody.tokens,
    ] as Token[];
  }
}

export class WhileStatementNode {
  condition: BooleanExpressionNode;
  body: StatementNode;
  tokens: Token[] = [];
  constructor(node: ParserNode) {
    this.condition = new BooleanExpressionNode(node.children[2]);
    this.body = getStatementNode(node.children[4]);
    this.tokens = [
      node.children[0].token,
      node.children[1].token,
      ...this.condition.tokens,
      node.children[3].token,
      ...this.body.tokens,
    ] as Token[];
  }
}

export class AssignmentStatementNode {
  identifier!: string;
  expression!: ExpressionNode;
  tokens: Token[] = [];
  constructor(node: ParserNode) {
    if (node.children[0].token instanceof IdentifierToken) {
      this.tokens = node.children.map((child) => child.token) as Token[];
      this.identifier = node.children[0].token?.identifier;
      this.expression = getExpressionNode(node.children[2]);
    }
  }
}

export function getStatementNode(node: ParserNode): StatementNode {
  switch (node.symbol) {
    case RuleType.STMT:
      return getStatementNode(node.children[0]);
    case RuleType.COMPOUNDSTMT:
      return new CompoundStatementNode(node);
    case RuleType.IFSTMT:
      return new IfStatementNode(node);
    case RuleType.WHILESTMT:
      return new WhileStatementNode(node);
    case RuleType.ASSGSTMT:
      return new AssignmentStatementNode(node);
    default:
      throw new Error(`Unknown statement type: ${String(node.symbol)}`);
  }
}

export type StatementNode =
  | CompoundStatementNode
  | IfStatementNode
  | WhileStatementNode
  | AssignmentStatementNode;
