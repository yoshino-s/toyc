import { readFileSync } from "fs";

import Evaluator from "evaluator";
import Lexer, { Tokens } from "lexer";
import Parser, { Rules } from "llparser";

if (process.argv.length !== 3) {
  console.error("Usage: yarn lex <file>");
  process.exit(1);
}

const input = readFileSync(process.argv[2], "utf8");

const lexer = new Lexer();
Object.values(Tokens).forEach((token) => lexer.addToken(token));

const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);

const evaluator = new Evaluator();

const evaluate = (input: string) =>
  evaluator.eval(parser.parse(lexer.lex(input)));

const result = evaluate(input);

for (const i in result) {
  console.log(`${i}: ${result[i].value}`);
}
