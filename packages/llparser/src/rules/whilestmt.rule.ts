import { KeywordType, DelimiterType } from "lexer";

import Rule from "./abstract.rule";
import { RuleType, RuleMap } from "./interface.rule";

export default class WhileStatementRule extends Rule {
  static type = RuleType.WHILESTMT;
  static ruleMap: RuleMap = [
    [
      KeywordType.WHILE,
      DelimiterType.LEFT_PAREN,
      RuleType.BOOLEXPR,
      DelimiterType.RIGHT_PAREN,
      RuleType.STMT,
    ],
  ];
}
