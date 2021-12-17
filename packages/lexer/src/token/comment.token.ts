import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export default class CommentToken extends Token {
  public readonly type = TokenType.COMMENT;
  public readonly ignore = true;
  constructor(public readonly comment: string) {
    super();
  }
  static rule = /\/\/.+$/;
  static from(str: string) {
    const token = new CommentToken(str.slice(2));
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      this.comment,
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
