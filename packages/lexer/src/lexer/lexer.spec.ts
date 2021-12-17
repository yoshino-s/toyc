import CommentToken from "../token/comment.token";
import DelimiterToken from "../token/delimiter.token";
import EmptyToken from "../token/empty.token";
import IdentifierToken from "../token/identifier.token";
import KeywordToken from "../token/keyword.token";
import NumberToken, { NumberType } from "../token/number.token";
import OperatorToken from "../token/operator.token";

import Lexer from "./Lexer";

describe("Lexer", () => {
  it("should parse", () => {
    const lexer = new Lexer();
    lexer.addToken(EmptyToken);
    lexer.addToken(CommentToken);
    lexer.addToken(KeywordToken);
    lexer.addToken(IdentifierToken);
    lexer.addToken(OperatorToken);
    lexer.addToken(DelimiterToken);
    lexer.addToken(NumberToken);

    const example = `a = 1; b = 2.444; c = 3e99; ;
if(a+b==c)then{d}`;
    const result = lexer.lex(example);
    expect(result).toEqual([
      new IdentifierToken("a"),
      new OperatorToken("="),
      new NumberToken(1),
      new DelimiterToken(";"),
      new IdentifierToken("b"),
      new OperatorToken("="),
      new NumberToken(2.444),
      new DelimiterToken(";"),
      new IdentifierToken("c"),
      new OperatorToken("="),
      new NumberToken(3e99, NumberType.REAL),
      new DelimiterToken(";"),
      new DelimiterToken(";"),
      new KeywordToken("if"),
      new DelimiterToken("("),
      new IdentifierToken("a"),
      new OperatorToken("+"),
      new IdentifierToken("b"),
      new OperatorToken("=="),
      new IdentifierToken("c"),
      new DelimiterToken(")"),
      new KeywordToken("then"),
      new DelimiterToken("{"),
      new IdentifierToken("d"),
      new DelimiterToken("}"),
    ]);
  });
});
