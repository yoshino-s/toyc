export { ParserError } from "./error";
import { IdentifierTable } from "./node/program.node";
import Parser from "./parser/Parser";
import ParserContext from "./parser/ParserContext";
import ParserResult from "./parser/ParserResult";
import * as Rules from "./rules";
import Rule from "./rules/abstract.rule";
export * from "./rules";
export * from "./node";

export { Parser, ParserContext, ParserResult, Rules, Rule, IdentifierTable };
export default Parser;
