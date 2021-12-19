import { Token } from "lexer";

import {
  epsilon,
  isUnterminatedSymbol,
  RuleSymbol,
  RuleType,
} from "../rules/interface.rule";

export default class ParserTree {
  root!: ParserTreeNode;
  currentNode!: ParserTreeNode;
  setRoot(root: RuleType, rule: RuleSymbol[]) {
    if (this.root) {
      throw Error("root is already set");
    } else {
      this.root = new ParserTreeNode(root, undefined as any, rule);
      this.root.father = this.root;
      this.currentNode = this.root;
    }
  }
  addNode(node: RuleSymbol, rule: RuleSymbol[]) {
    if (this.currentNode.expectedChildren.length === 0) {
      const father = this.currentNode.father;
      const index = father.children.indexOf(this.currentNode);
      if (index === father.children.length - 1) {
        this.currentNode = father;
        this.addNode(node, rule);
      } else {
        this.currentNode = father.children[index + 1];
        this.addNode(node, rule);
      }
    } else {
      if (!isUnterminatedSymbol(this.currentNode.expectedChildren[0]?.self)) {
        this.currentNode.children.push(
          this.currentNode.expectedChildren.shift() as ParserTreeNode
        );
        this.addNode(node, rule);
      } else if (this.currentNode.expectedChildren[0].self === node) {
        this.currentNode.expectedChildren.shift();
        const n = new ParserTreeNode(node, this.currentNode, rule);
        this.currentNode.children.push(n);
        this.currentNode = n;
      } else {
        throw Error("Error in addNode");
      }
    }
  }
  finish() {
    if (
      this.currentNode === this.root &&
      this.currentNode.expectedChildren.length === 0
    ) {
      return;
    }
    if (this.currentNode.expectedChildren.length === 0) {
      const father = this.currentNode.father;
      const index = father.children.indexOf(this.currentNode);
      if (index === father.children.length - 1) {
        this.currentNode = father;
        this.finish();
      } else {
        this.currentNode = father.children[index + 1];
        this.finish();
      }
    } else {
      if (!isUnterminatedSymbol(this.currentNode.expectedChildren[0]?.self)) {
        this.currentNode.children.push(
          this.currentNode.expectedChildren.shift() as ParserTreeNode
        );
        this.finish();
      } else {
        throw Error("Error in addNode");
      }
    }
  }
  export(tokens: Token[]) {
    const n = this.root.export();
    let i = 0;
    function dsp(n: ParserNode) {
      if (isUnterminatedSymbol(n.symbol)) {
        for (const c of n.children) {
          dsp(c);
        }
      } else {
        n.token = tokens[i++];
      }
    }
    dsp(n);
    return n;
  }
  print(): string {
    return this.root.print();
  }
}

class ParserTreeNode {
  children: ParserTreeNode[] = [];
  public readonly expectedChildren: ParserTreeNode[];
  constructor(
    public readonly self: RuleSymbol,
    public father: ParserTreeNode,
    rule: RuleSymbol[] = []
  ) {
    this.expectedChildren = rule
      .filter((v) => v !== epsilon)
      .map((v) => new ParserTreeNode(v, this));
  }
  print(): string {
    if (this.children.length + this.expectedChildren.length) {
      return `${String(this.self)} [ ${this.children.map((v) => v.print())}${
        this.expectedChildren.length ? "|" : ""
      }${this.expectedChildren.map((v) => v.print())} ] `;
    } else {
      return `${String(this.self)}`;
    }
  }
  export(): ParserNode {
    return {
      symbol: this.self,
      children: this.children.map((v) => v.export()),
    };
  }
}

export interface ParserNode {
  readonly symbol: RuleSymbol;
  readonly children: ParserNode[];
  token?: Token;
}
