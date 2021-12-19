import { DelimiterType } from "lexer";

import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class CompoundStatementRule extends Rule {
  static type = RuleType.COMPOUNDSTMT;
  static ruleMap: RuleMap = [
    [DelimiterType.LEFT_BRACE, RuleType.STMTS, DelimiterType.RIGHT_BRACE],
  ];
}
