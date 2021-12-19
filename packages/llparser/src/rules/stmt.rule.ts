import Rule from "./abstract.rule";
import { RuleType, RuleMap } from "./interface.rule";

export default class StatementRule extends Rule {
  static type = RuleType.STMT;
  static ruleMap: RuleMap = [
    [RuleType.IFSTMT],
    [RuleType.WHILESTMT],
    [RuleType.ASSGSTMT],
    [RuleType.COMPOUNDSTMT],
  ];
}
