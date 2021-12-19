import { TokenType, DelimiterType, NumberType } from "lexer";

import Rule from "./abstract.rule";
import { RuleMap, RuleType } from "./interface.rule";

export default class SimpleExpressionRule extends Rule {
  static type = RuleType.SIMPLEEXPR;
  static ruleMap: RuleMap = [
    [TokenType.IDENTIFIER],
    [NumberType.INTEGER],
    [NumberType.REAL],
    [DelimiterType.LEFT_PAREN, RuleType.ARITHEXPR, DelimiterType.RIGHT_PAREN],
  ];
}
