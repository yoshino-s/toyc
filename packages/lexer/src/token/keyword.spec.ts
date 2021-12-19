import { expectLexTo } from "../spec.utils";

import KeywordToken from "./keyword.token";

describe("Keyword Token", () => {
  it("should lex a keyword", () => {
    expectLexTo("if", KeywordToken, (t) => expect(t.keyword).toBe("if"));
    expectLexTo("then", KeywordToken, (t) => expect(t.keyword).toBe("then"));
    expectLexTo("else", KeywordToken, (t) => expect(t.keyword).toBe("else"));
    expectLexTo("int", KeywordToken, (t) => expect(t.keyword).toBe("int"));
    expectLexTo("real", KeywordToken, (t) => expect(t.keyword).toBe("real"));
  });
});
