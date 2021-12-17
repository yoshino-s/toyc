"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lexer_1 = require("lexer");
if (process.argv.length !== 3) {
    console.error("Usage: yarn lex <file>");
    process.exit(1);
}
const input = (0, fs_1.readFileSync)(process.argv[2], "utf8");
const lexer = new lexer_1.Lexer();
Object.values(lexer_1.Tokens).forEach((token) => lexer.addToken(token));
const result = lexer.lex(input, process.argv[2]);
result.forEach((token) => {
    console.log(token.toQuadraple());
});
