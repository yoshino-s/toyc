import Rule from "./abstract.rule";
import { RuleType, RuleMap } from "./interface.rule";

export default class MultipleExpressionRule extends Rule {
  static type = RuleType.MULTIEXPR;
  static ruleMap: RuleMap = [[RuleType.SIMPLEEXPR, RuleType.MULTIEXPRPRIME]];
}
