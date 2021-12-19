import { readFileSync } from "fs";

import { Compiler } from "evaluator";
import Lexer, { Tokens } from "lexer";
import Parser, { ProgramNode, Rules } from "llparser";

if (process.argv.length !== 3) {
  console.error("Usage: yarn lex <file>");
  process.exit(1);
}

const input = readFileSync(process.argv[2], "utf8");

const lexer = new Lexer();
Object.values(Tokens).forEach((token) => lexer.addToken(token));

const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);

const compiler = new Compiler();

const compile = (input: string) =>
  compiler.compileProgram(parser.parse(lexer.lex(input)).root as ProgramNode);

const result = compile(input);

for (const i in result) {
  console.log(i.toString());
}
