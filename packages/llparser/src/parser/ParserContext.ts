import {
  KeywordToken,
  LexerResult,
  NumberToken,
  OperatorToken,
  Token,
  DelimiterToken,
} from "lexer";

import { ParserError } from "../error";
import {
  epsilon,
  isUnterminatedSymbol,
  RuleSymbol,
  RuleType,
  TerminatedSymbol,
} from "../rules/interface.rule";

import Parser from "./Parser";

export default class ParserContext {
  stack: RuleSymbol[] = [];
  pointer = 0;
  finished = false;
  tokens: Token[];
  row = 0;
  column = 0;
  constructor(
    public readonly parser: Parser,
    public readonly lexerResult: LexerResult
  ) {
    this.stack = [];
    this.tokens = lexerResult.tokens;
    this.push(parser.startRule.type);
  }
  step(): [RuleType, RuleSymbol[]] | undefined {
    if (this.isEmpty()) {
      this.finished = true;
      return;
    }
    const top = this.top();
    const token = this.peekToken();
    const symbol = this.tokenToTerminatedSymbol(token);
    // console.log("Stack: ", this.stack);
    // console.log(
    //   "Input: ",
    //   this.tokens.map((t) => t.toQuadraple().slice(0, 2)).slice(this.pointer)
    // );
    if (isUnterminatedSymbol(top)) {
      const rule = this.parser.parseTable.get(`${top}-${String(symbol)}`);
      if (!rule) {
        throw new ParserError(`Cannot expand ${top} on ${token.type}`, this);
      }
      this.pop();
      if (rule[0] !== epsilon) {
        this.push(...Array.from(rule).reverse());
      }
      // console.log("Expanded", top, "to", rule);
      return [top, rule];
    } else {
      if (top === symbol) {
        this.pop();
        this.getToken();
      } else {
        throw new ParserError(`Expect ${String(top)} Not ${token.type}`, this);
      }
    }
  }
  private tokenToTerminatedSymbol(token: Token): TerminatedSymbol {
    if (token instanceof NumberToken) {
      return token.numberType;
    }
    if (token instanceof KeywordToken) {
      return token.keyword;
    }
    if (token instanceof OperatorToken) {
      return token.operator;
    }
    if (token instanceof DelimiterToken) {
      return token.delimiter;
    }
    return token.type;
  }
  private push(...symbol: RuleSymbol[]) {
    this.stack.push(...symbol);
  }
  private pop() {
    return this.stack.pop();
  }
  private top() {
    return this.stack[this.stack.length - 1];
  }
  private isEmpty() {
    return this.stack.length === 0;
  }
  private getToken() {
    const token = this.peekToken();
    this.pointer++;
    return token;
  }
  private peekToken() {
    const token = this.tokens[this.pointer];
    if (token === undefined) {
      this.column = this.lexerResult.lines.length - 1;
      this.row = this.lexerResult.lines[this.column].length;
      throw new ParserError("Unexpected end of input", this);
    } else {
      this.column = Reflect.getMetadata("column", token);
      this.row = Reflect.getMetadata("row", token);
    }
    return token;
  }
}
