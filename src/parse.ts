import { readFileSync } from "fs";

import Lexer, { Tokens } from "lexer";
import Parser, { Rules, ProgramNode } from "llparser";

if (process.argv.length !== 3) {
  console.error("Usage: yarn lex <file>");
  process.exit(1);
}

const input = readFileSync(process.argv[2], "utf8");

const lexer = new Lexer();
Object.values(Tokens).forEach((token) => lexer.addToken(token));

const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);

const parse = (input: string) =>
  parser.parse(
    lexer.lex(input, {
      name: process.argv[2],
    })
  );

try {
  const node = parse(input).root as ProgramNode;

  console.log("Identifier Table:");
  for (const [id, { type, value }] of Object.entries(node.identifierTable)) {
    console.log(`${id}: ${type} = ${value}`);
  }
} catch (e) {
  console.error(e);
  process.exit(1);
}
