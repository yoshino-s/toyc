import { LexerResult } from "lexer";

import { ParserError } from "../error";
import { ProgramNode } from "../node";
import { StaticRule } from "../rules/abstract.rule";
import {
  epsilon,
  isUnterminatedSymbol,
  RuleSymbol,
  RuleType,
  terminate,
  TerminatedSymbol,
} from "../rules/interface.rule";

import ParserContext from "./ParserContext";
import ParserResult from "./ParserResult";
import ParserTree from "./ParserTree";

export default class Parser {
  public readonly parserRules: Set<StaticRule>;
  public readonly ruleFirstSet = new Map<RuleType, Set<TerminatedSymbol>>();
  public readonly ruleFollowSet = new Map<RuleType, Set<TerminatedSymbol>>();
  public readonly parseTable = new Map<string, RuleSymbol[]>();
  constructor(rules: StaticRule[], public readonly startRule: StaticRule) {
    this.parserRules = new Set(rules);
    if (!this.parserRules.has(startRule)) {
      throw new ParserError(
        `Start rule ${startRule.name} is not in the set of rules.`
      );
    }
    this.checkRuleClosure();
    this.buildFirstSet();
    this.buildFollowSet();
    this.buildParseTable();
  }
  getRuleByType(type: RuleType): StaticRule {
    return Array.from<StaticRule>(this.parserRules.values()).find(
      (v) => v.type === type
    ) as StaticRule;
  }
  buildFirstSet() {
    this.parserRules.forEach((rule) => this.getFirstSet(rule.type));
  }
  checkRuleClosure() {
    this.parserRules.forEach((parserRule) => {
      parserRule.ruleMap.forEach((rule) =>
        rule.forEach((ruleSymbol) => {
          if (
            isUnterminatedSymbol(ruleSymbol) &&
            !this.getRuleByType(ruleSymbol)
          ) {
            throw new ParserError(
              `Rule ${ruleSymbol} is not in the set of rules.`
            );
          }
        })
      );
    });
  }
  getFirstSet(symbol: RuleSymbol): Set<TerminatedSymbol> {
    if (isUnterminatedSymbol(symbol)) {
      const result = new Set<TerminatedSymbol>();
      const parserRule = this.getRuleByType(symbol);
      for (const rule of parserRule.ruleMap) {
        if (isUnterminatedSymbol(rule[0])) {
          let allHasEpsilon = true;
          let i = 0;
          while (allHasEpsilon) {
            if (i === rule.length) {
              result.add(epsilon);
              break;
            }
            const r = rule[i];
            const subSet = this.getFirstSet(r);
            if (subSet.has(epsilon)) {
              subSet.delete(epsilon);
            } else {
              allHasEpsilon = false;
            }
            subSet.forEach((v) => result.add(v));
            i++;
          }
        } else {
          result.add(rule[0]);
        }
      }
      this.ruleFirstSet.set(symbol, result);
      return result;
    } else {
      return new Set([symbol]);
    }
  }
  getSpecificFirstSet(rule: RuleSymbol[]) {
    const result = new Set<TerminatedSymbol>();
    if (isUnterminatedSymbol(rule[0])) {
      let allHasEpsilon = true;
      let i = 0;
      while (allHasEpsilon) {
        if (i === rule.length) {
          result.add(epsilon);
          break;
        }
        const r = rule[i];
        const subSet = this.getFirstSet(r);
        if (subSet.has(epsilon)) {
          subSet.delete(epsilon);
        } else {
          allHasEpsilon = false;
        }
        subSet.forEach((v) => result.add(v));
        i++;
      }
    } else {
      result.add(rule[0]);
    }
    return result;
  }
  #dirty = false;
  #followSetFinish = false;
  getFollowSet(symbol: RuleType): Set<TerminatedSymbol> {
    const set = this.ruleFollowSet.get(symbol) ?? new Set<TerminatedSymbol>();
    if (this.#followSetFinish) {
      return set;
    }
    this.ruleFollowSet.set(symbol, set);
    const update = (from: Set<TerminatedSymbol>, to: Set<TerminatedSymbol>) => {
      from.forEach((v) => {
        if (!to.has(v)) {
          to.add(v);
          this.#dirty = true;
        }
      });
    };
    for (const parserRule of this.parserRules) {
      for (const rule of parserRule.ruleMap) {
        const index = rule.indexOf(symbol);
        if (index !== -1) {
          for (let j = index + 1; j <= rule.length; j++) {
            if (j === rule.length) {
              const ss = this.ruleFollowSet.get(parserRule.type);
              ss && update(ss, set);
            } else {
              const nextSymbol = rule[j];
              const s = this.getFirstSet(nextSymbol);
              if (s.has(epsilon)) {
                s.delete(epsilon);
                update(s, set);
              } else {
                update(s, set);
                break;
              }
            }
          }
        }
      }
    }
    return set;
  }
  buildFollowSet() {
    this.ruleFollowSet.set(this.startRule.type, new Set([terminate]));
    do {
      this.#dirty = false;
      this.parserRules.forEach((parserRule) => {
        this.getFollowSet(parserRule.type);
      });
    } while (this.#dirty);
    this.#followSetFinish = true;
  }
  buildParseTable() {
    const FOLLOW = (S: RuleType) => this.getFollowSet(S);
    for (const parserRule of this.parserRules) {
      const A = parserRule.type;
      for (const rule of parserRule.ruleMap) {
        const R = rule;
        const F = this.getSpecificFirstSet(R);
        for (const a of F) {
          if (a === epsilon) {
            for (const b of FOLLOW(A)) {
              this.parseTable.set(`${A}-${String(b)}`, R);
            }
          } else {
            this.parseTable.set(`${A}-${String(a)}`, R);
          }
        }
      }
    }
  }
  parse(lexerResult: LexerResult): ParserResult {
    const context = new ParserContext(this, lexerResult);
    const tree = new ParserTree();
    while (!context.finished) {
      const rule = context.step();
      if (rule) {
        if (!tree.root) {
          tree.setRoot(rule[0], rule[1]);
        } else {
          tree.addNode(rule[0], rule[1]);
        }
      }
    }
    tree.finish();
    const node = new ProgramNode(tree.export(lexerResult.tokens));
    node.tokens = lexerResult.tokens;
    return new ParserResult(node, lexerResult);
  }
}
