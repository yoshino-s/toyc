import { OperatorType } from "lexer";

import Rule from "./abstract.rule";
import { epsilon, RuleMap, RuleType } from "./interface.rule";

export default class ArithExpressionPrimeRule extends Rule {
  static type = RuleType.ARITHEXPRPRIME;
  static ruleMap: RuleMap = [
    [OperatorType.ADD, RuleType.MULTIEXPR, RuleType.ARITHEXPRPRIME],
    [OperatorType.SUB, RuleType.MULTIEXPR, RuleType.ARITHEXPRPRIME],
    [epsilon],
  ];
}
