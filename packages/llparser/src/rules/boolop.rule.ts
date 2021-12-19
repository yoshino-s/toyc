import { OperatorType } from "lexer";

import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class BooleanOpRule extends Rule {
  static type = RuleType.BOOLOP;
  static ruleMap: RuleMap = [
    [OperatorType.LT],
    [OperatorType.GT],
    [OperatorType.EQ],
    [OperatorType.LE],
    [OperatorType.GE],
  ];
}
