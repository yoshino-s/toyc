import { expectLexTo, expectLexToError } from "../spec.utils";

import IdentifierToken from "./identifier.token";

describe("Identifier Token", () => {
  it("should lex a identifier", () => {
    expectLexTo("aaa", IdentifierToken, (t) =>
      expect(t.identifier).toBe("aaa")
    );
    expectLexTo("a123456", IdentifierToken, (t) =>
      expect(t.identifier).toBe("a123456")
    );
    expectLexToError("1aaa", IdentifierToken);
    expectLexTo("a" + "1".repeat(63), IdentifierToken);
    expectLexTo("a".repeat(64), IdentifierToken);
    expectLexToError("a".repeat(65), IdentifierToken);
  });
});
