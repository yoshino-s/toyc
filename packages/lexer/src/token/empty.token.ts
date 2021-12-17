import Token from "./abstract.token";
import { TokenType } from "./token.interface";

export default class EmptyToken extends Token {
  public readonly type = TokenType.EMPTY;
  public readonly ignore = true;
  constructor() {
    super();
  }
  static rule = / |\t|\n|\r/;
  static from() {
    const token = new EmptyToken();
    return token;
  }
  public toQuadraple(): [string, string, number, number] {
    return [
      this.type,
      "",
      Reflect.getMetadata("row", this),
      Reflect.getMetadata("column", this),
    ];
  }
}
