import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class ArithmeticExpressionRule extends Rule {
  static type = RuleType.ARITHEXPR;
  static ruleMap: RuleMap = [[RuleType.MULTIEXPR, RuleType.ARITHEXPRPRIME]];
}
