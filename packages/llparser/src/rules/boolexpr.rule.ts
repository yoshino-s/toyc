import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class BooleanExpressionRule extends Rule {
  static type = RuleType.BOOLEXPR;
  static ruleMap: RuleMap = [
    [RuleType.ARITHEXPR, RuleType.BOOLOP, RuleType.ARITHEXPR],
  ];
}
