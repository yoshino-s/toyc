import { DelimiterType, KeywordType } from "lexer";

import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class IfStatementRule extends Rule {
  static type = RuleType.IFSTMT;
  static ruleMap: RuleMap = [
    [
      KeywordType.IF,
      DelimiterType.LEFT_PAREN,
      RuleType.BOOLEXPR,
      DelimiterType.RIGHT_PAREN,
      KeywordType.THEN,
      RuleType.STMT,
      KeywordType.ELSE,
      RuleType.STMT,
    ],
  ];
}
