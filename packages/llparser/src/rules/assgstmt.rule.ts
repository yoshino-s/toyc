import { TokenType, OperatorType, DelimiterType } from "lexer";

import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class AssignStatementRule extends Rule {
  static type = RuleType.ASSGSTMT;
  static ruleMap: RuleMap = [
    [
      TokenType.IDENTIFIER,
      OperatorType.ASSIGN,
      RuleType.ARITHEXPR,
      DelimiterType.SEMI,
    ],
  ];
}
