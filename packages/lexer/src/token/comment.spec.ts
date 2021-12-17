import { expectLexTo } from "../spec.utils";

import CommentToken from "./comment.token";

describe("Comment Token", () => {
  it("should lex a comment", () => {
    expectLexTo("//233333", CommentToken, (t) =>
      expect(t.comment).toBe("233333")
    );
  });
});
