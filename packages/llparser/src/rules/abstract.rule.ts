import { RuleMap, RuleType } from "./interface.rule";

export default abstract class Rule {
  static ruleMap: RuleMap;
  static type: RuleType;
  getStaticRule(): typeof Rule {
    return this.constructor as any;
  }
}

export type StaticRule = typeof Rule;
