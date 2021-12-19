import { LexerError } from "./error";
import Lexer from "./lexer/Lexer";
import Token, { TokenFrom } from "./token/abstract.token";

export const expectLexTo = <T extends Token>(
  input: string,
  expected: {
    new (...args: any[]): T;
    rule: RegExp;
    from: TokenFrom;
    privilege: number;
  },
  cb?: (t: T) => void
) => {
  const lexer = new Lexer();
  lexer.addToken(expected);
  const tokens = lexer.lex(input, {
    keepIgnoredTokens: true,
  }).tokens;
  expect(tokens[0]).toBeInstanceOf(expected);
  cb?.(tokens[0] as T);
};
export const expectLexToError = <T extends Token>(
  input: string,
  expected: {
    new (...args: any[]): T;
    rule: RegExp;
    from: TokenFrom;
    privilege: number;
  },
  cb?: (t: LexerError) => void
) => {
  const lexer = new Lexer();
  lexer.addToken(expected);
  expect(() => {
    try {
      lexer.lex(input, {
        keepIgnoredTokens: true,
      }).tokens;
    } catch (e) {
      expect(LexerError).toBeInstanceOf(LexerError);
      cb?.(e as LexerError);
    }
  });
};
