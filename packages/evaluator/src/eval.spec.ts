import Lexer, { Tokens } from "lexer";
import Parser, { Rules } from "llparser";

import Evaluator from "./eval/Evaluator";

describe("Evaluator", () => {
  it("should eval", () => {
    const lexer = new Lexer();
    Object.values(Tokens).forEach((token) => lexer.addToken(token));
    const parser = new Parser([...Object.values(Rules)], Rules.ProgramRule);
    const evaluator = new Evaluator();
    const lex = (input: string) => lexer.lex(input);
    const parse = (input: string) => parser.parse(lex(input));
    const evaluate = (input: string) => evaluator.eval(parse(input));
    const expectEvalTo = (input: string, expected: Record<string, number>) => {
      const actual = evaluate(input);
      for (const i in expected) {
        expect(actual[i].value).toEqual(expected[i]);
      }
    };
    expectEvalTo(
      `int a = 1 ; int b = 2 ;  real c = 3.0 ; 
    { a = a + 1 ; 
      b = b * a ;  
      if ( a < b ) then c = c / 2 ; else c = c / 4 ; }
`,
      { a: 2, b: 4, c: 1.5 }
    );
    expectEvalTo(
      `
int a = 1 ; int b = 100 ; 
{
  while(b>0) {
    a = a+1;
    b = b-1;
  }
}
`,
      { a: 101, b: 0 }
    );
  });
});
