import { DelimiterType } from "lexer";

import Rule from "./abstract.rule";
import { RuleType, RuleMap, epsilon } from "./interface.rule";

export default class DecelerationsRule extends Rule {
  static type = RuleType.DECLS;
  static ruleMap: RuleMap = [
    [RuleType.DECL, DelimiterType.SEMI, RuleType.DECLS],
    [epsilon],
  ];
}
