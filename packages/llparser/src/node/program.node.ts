import {
  KeywordToken,
  NumberToken,
  NumberType,
  IdentifierToken,
  Token,
} from "lexer";

import { ParserNode } from "../parser/ParserTree";

import { getStatementNode, StatementNode } from "./statement.node";

export type IdentifierTable = Record<
  string,
  { type: NumberType; value: number }
>;

export class ProgramNode {
  type: "Program" = "Program";
  identifierTable: IdentifierTable;
  statements: StatementNode;
  tokens: Token[] = [];
  constructor(node: ParserNode) {
    let declarations = node.children[0];
    this.statements = getStatementNode(node.children[1]);
    this.identifierTable = {};
    while (declarations.children.length > 0) {
      const declaration = declarations.children[0];
      const type = declaration.children[0].token;
      const identifier = declaration.children[1].token;
      const value = declaration.children[3].token;
      if (
        type instanceof KeywordToken &&
        identifier instanceof IdentifierToken &&
        value instanceof NumberToken
      ) {
        this.identifierTable[identifier.identifier] = {
          type: type.keyword as any as NumberType,
          value: value.number,
        };
      }
      declarations = declarations.children[2];
    }
  }
}
