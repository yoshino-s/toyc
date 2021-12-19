import { OperatorType } from "lexer";

import Rule from "./abstract.rule";
import { RuleType, RuleMap, epsilon } from "./interface.rule";

export default class MultipleExpressionPrimeRule extends Rule {
  static type = RuleType.MULTIEXPRPRIME;
  static ruleMap: RuleMap = [
    [OperatorType.MUL, RuleType.SIMPLEEXPR, RuleType.MULTIEXPRPRIME],
    [OperatorType.DIV, RuleType.SIMPLEEXPR, RuleType.MULTIEXPRPRIME],
    [epsilon],
  ];
}
