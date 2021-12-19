import {
  TokenType,
  DelimiterType,
  KeywordType,
  NumberType,
  OperatorType,
} from "lexer";

import Parser from "./parser/Parser";
import * as Rules from "./rules";
import { StaticRule } from "./rules/abstract.rule";
import ArithmeticExpressionRule from "./rules/arithexpr.rule";
import ArithExpressionPrimeRule from "./rules/arithexprprime.rule";
import AssignStatementRule from "./rules/assgstmt.rule";
import BooleanOpRule from "./rules/boolop.rule";
import CompoundStatementRule from "./rules/compoundstmt.rule";
import DeclarationRule from "./rules/decl.rule";
import DeclarationsRule from "./rules/decls.rule";
import IfStatementRule from "./rules/ifstmt.rule";
import { epsilon, TerminatedSymbol } from "./rules/interface.rule";
import MultipleExpressionRule from "./rules/multiexpr.rule";
import MultipleExpressionPrimeRule from "./rules/multiexprime.rule";
import ProgramRule from "./rules/program.rule";
import SimpleExpressionRule from "./rules/simpleexpr.rule";
import StatementRule from "./rules/stmt.rule";
import StatementsRule from "./rules/stmts.rule";
import WhileStatementRule from "./rules/whilestmt.rule";

describe("First Set", () => {
  it("should get", () => {
    const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);
    const expectFirstSetToBe = (s: StaticRule, symbols: TerminatedSymbol[]) => {
      expect(parser.getFirstSet(s.type)).toEqual(new Set(symbols));
    };
    expectFirstSetToBe(BooleanOpRule, [
      OperatorType.GT,
      OperatorType.LT,
      OperatorType.EQ,
      OperatorType.LE,
      OperatorType.GE,
    ]);
    expectFirstSetToBe(IfStatementRule, [KeywordType.IF]);
    expectFirstSetToBe(WhileStatementRule, [KeywordType.WHILE]);
    expectFirstSetToBe(ProgramRule, [
      DelimiterType.LEFT_BRACE,
      KeywordType.INT,
      KeywordType.REAL,
    ]);
    expectFirstSetToBe(DeclarationRule, [KeywordType.INT, KeywordType.REAL]);
    expectFirstSetToBe(DeclarationsRule, [
      KeywordType.INT,
      KeywordType.REAL,
      epsilon,
    ]);
    expectFirstSetToBe(CompoundStatementRule, [DelimiterType.LEFT_BRACE]);
    expectFirstSetToBe(AssignStatementRule, [TokenType.IDENTIFIER]);
    const stmtFirst = [
      KeywordType.IF,
      KeywordType.WHILE,
      TokenType.IDENTIFIER,
      DelimiterType.LEFT_BRACE,
    ];
    expectFirstSetToBe(StatementRule, stmtFirst);
    expectFirstSetToBe(StatementsRule, [...stmtFirst, epsilon]);
    const mathExprFirst = [
      NumberType.INTEGER,
      NumberType.REAL,
      TokenType.IDENTIFIER,
      DelimiterType.LEFT_PAREN,
    ];
    expectFirstSetToBe(SimpleExpressionRule, mathExprFirst);
    expectFirstSetToBe(MultipleExpressionPrimeRule, [
      OperatorType.MUL,
      OperatorType.DIV,
      epsilon,
    ]);
    expectFirstSetToBe(MultipleExpressionRule, mathExprFirst);
    expectFirstSetToBe(ArithExpressionPrimeRule, [
      OperatorType.ADD,
      OperatorType.SUB,
      epsilon,
    ]);
    expectFirstSetToBe(ArithmeticExpressionRule, mathExprFirst);
  });
});
