import { TokenType, KeywordType, NumberType, OperatorType } from "lexer";

import Rule from "./abstract.rule";
import { RuleType, RuleMap } from "./interface.rule";

export default class DecelerationRule extends Rule {
  static type = RuleType.DECL;
  static ruleMap: RuleMap = [
    [
      KeywordType.INT,
      TokenType.IDENTIFIER,
      OperatorType.ASSIGN,
      NumberType.INTEGER,
    ],
    [
      KeywordType.REAL,
      TokenType.IDENTIFIER,
      OperatorType.ASSIGN,
      NumberType.REAL,
    ],
  ];
}
