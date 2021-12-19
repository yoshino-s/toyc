import {
  TokenType,
  KeywordType,
  NumberType,
  OperatorType,
  DelimiterType,
} from "lexer";

export type Token =
  | TokenType
  | DelimiterType
  | OperatorType
  | KeywordType
  | NumberType;

export const epsilon = Symbol("epsilon");
export const terminate = Symbol("terminate");

export type TerminatedSymbol = Token | typeof epsilon | typeof terminate;

export enum RuleType {
  ARITHEXPR = "ArithmeticExpression",
  ARITHEXPRPRIME = "ArithExpressionPrime",
  ASSGSTMT = "AssignStatement",
  BOOLEXPR = "BooleanExpr",
  BOOLOP = "BooleanOp",
  WHILESTMT = "WhileStatement",
  STMTS = "Statements",
  STMT = "Statement",
  IFSTMT = "IfStatement",
  COMPOUNDSTMT = "CompoundStatement",
  MULTIEXPR = "MultipleExpression",
  MULTIEXPRPRIME = "MultipleExpressionPrime",
  SIMPLEEXPR = "SimpleExpression",
  PROGRAM = "Program",
  DECL = "Declaration",
  DECLS = "Declarations",
}

export type UnterminatedRuleSymbol = RuleType;

export type RuleSymbol = TerminatedSymbol | UnterminatedRuleSymbol;

export const isUnterminatedSymbol = (
  symbol: RuleSymbol
): symbol is UnterminatedRuleSymbol =>
  Object.values(RuleType as any).includes(symbol);

export type RuleMap = RuleSymbol[][];
