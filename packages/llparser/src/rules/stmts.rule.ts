import Rule from "./abstract.rule";
import { RuleType, RuleMap, epsilon } from "./interface.rule";

export default class StatementsRule extends Rule {
  static type = RuleType.STMTS;
  static ruleMap: RuleMap = [[RuleType.STMT, RuleType.STMTS], [epsilon]];
}
