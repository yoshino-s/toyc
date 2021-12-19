import Lexer from "./lexer/Lexer";
import LexerContext from "./lexer/LexerContext";
import LexerResult from "./lexer/LexerResult";
export * from "./token";
export * as Tokens from "./token";
import Token from "./token/abstract.token";
import { DelimiterType } from "./token/delimiter.token";
import { KeywordType } from "./token/keyword.token";
import { NumberType } from "./token/number.token";
import { OperatorType } from "./token/operator.token";
import { TokenType } from "./token/token.interface";
export { LexerError } from "./error";

export {
  Lexer,
  LexerContext,
  TokenType,
  LexerResult,
  DelimiterType,
  KeywordType,
  NumberType,
  OperatorType,
  Token,
};

export default Lexer;
