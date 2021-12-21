import { readFileSync } from "fs";

import { Lexer, Tokens } from "lexer";

if (process.argv.length !== 3) {
  console.error("Usage: yarn lex <file>");
  process.exit(1);
}

const input = readFileSync(process.argv[2], "utf8");

const lexer = new Lexer();

Object.values(Tokens).forEach((token) => lexer.addToken(token));

try {
  const result = lexer.lex(input, { name: process.argv[2] });
  result.tokens.forEach((token) => {
    console.log(token.toQuadraple());
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
