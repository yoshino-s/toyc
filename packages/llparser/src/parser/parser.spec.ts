import Lexer, { Tokens, TokenType } from "lexer";

import { ParserError } from "../error";
import * as Rules from "../rules";
import { RuleType } from "../rules/interface.rule";

import Parser from "./Parser";

describe("Parser", () => {
  const lexer = new Lexer();
  Object.values(Tokens).forEach((token) => lexer.addToken(token));

  const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);

  const lex = (input: string) => lexer.lex(input);
  const parse = (input: string) => parser.parse(lex(input));

  const expectParseToError = (input: string, cb?: (e: ParserError) => void) => {
    try {
      parse(input);
      expect("").toBe("No Error");
    } catch (e) {
      expect(e).toBeInstanceOf(ParserError);
      cb?.(e as ParserError);
    }
  };

  it("should raise error when unexpected end of input", () => {
    expectParseToError("", (e) => {
      expect(e.reason).toBe("Unexpected end of input");
    });
    expectParseToError("1", (e) => {
      expect(e.reason).toBe(
        `Cannot expand ${RuleType.PROGRAM} on ${TokenType.NUMBER}`
      );
    });
  });
});
