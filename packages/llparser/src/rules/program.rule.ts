import Rule from "./abstract.rule";
import { RuleType, RuleMap } from "./interface.rule";

export default class ProgramRule extends Rule {
  static type = RuleType.PROGRAM;
  static ruleMap: RuleMap = [[RuleType.DECLS, RuleType.COMPOUNDSTMT]];
}
