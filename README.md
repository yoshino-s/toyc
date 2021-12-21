# ToyC

A toy compiler for a language called ToyC.

## Build

```bash
yarn && yarn workspaces foreach -pt run build
```

## Run

```bash
yarn lex test/loop.toyc
yarn parse test/loop.toyc
yarn eval test/loop.toyc
```

## Grammar

![img](http://www.sciweavers.org/tex2img.php?eq=program%20%20%20%20%20%20%20%26%20%5Cto%20compoundstmt%20%5C%5C%0Adecls%20%20%20%20%20%20%20%20%20%26%20%5Cto%20decl%5Ctextbf%7B%20%3B%20%7D%20decls%20%7C%20%5Cepsilon%20%5C%5C%0Adecl%20%20%20%20%20%20%20%20%20%20%26%20%5Cto%20%5Ctextbf%7Bint%20%7D%20ID%20%5Ctextbf%7B%20%3D%20%7D%20INTNUM%20%7C%20%5Ctextbf%7B%20real%20%7D%20ID%20%5Ctextbf%7B%20%3D%20%7D%20REALNUM%20%5C%5C%0Astmt%20%20%20%20%20%20%20%20%20%20%26%20%5Cto%20ifstmt%20%20%7C%20%20whilestmt%20%20%7C%20%20assgstmt%20%20%7C%20%20compoundstmt%20%5C%5C%0Acompoundstmt%20%20%26%20%5Cto%20%5C%7B%20stmts%20%5C%7D%20%5C%5C%0Astmts%20%20%20%20%20%20%20%20%20%26%20%5Cto%20stmt%20stmts%20%7C%20%5Cepsilon%20%5C%5C%0Aifstmt%20%20%20%20%20%20%20%20%26%20%5Cto%20%5Ctextbf%7Bif%20%7D%20%28%20boolexpr%20%29%20%5Ctextbf%7B%20then%20%7D%20stmt%20%5Ctextbf%7B%20else%20%7D%20stmt%20%5C%5C%0Awhilestmt%20%20%20%20%20%26%20%5Cto%20%5Ctextbf%7Bwhile%7D%20%28%20boolexpr%20%29%20stmt%20%5C%5C%0Aassgstmt%20%20%20%20%20%20%26%20%5Cto%20ID%20%3D%20arithexpr%20%3B%20%5C%5C%0Aboolexp%20%20%20%20%20%20%20%26%20%5Cto%20arithexpr%5C%20boolop%5C%20arithexpr%20%5C%5C%0Aboolop%20%20%20%20%20%20%20%20%26%20%5Cto%20%3C%20%20%7C%20%20%3E%20%20%7C%20%20%3C%3D%20%20%7C%20%20%3E%3D%20%20%7C%20%3D%3D%20%5C%5C%0Aarithexpr%20%20%20%20%20%26%20%5Cto%20multexpr%5C%20arithexprprime%20%5C%5C%0Aarithexprprime%26%20%5Cto%20%2B%20multexpr%5C%20arithexprprime%20%20%7C%20%20-%20multexpr%5C%20arithexprprime%20%20%7C%20%5Cepsilon%20%20%20%5C%5C%0Amultexpr%20%20%20%20%20%20%26%20%5Cto%20%20simpleexpr%5C%20%20multexprprime%20%5C%5C%0Amultexprprime%20%26%20%5Cto%20%20%2A%20simpleexpr%5C%20multexprprime%20%20%7C%20%20%2F%20simpleexpr%5C%20multexprprime%20%20%7C%20%20%5Cepsilon%20%5C%5C%0Asimpleexpr%20%20%20%20%26%20%5Cto%20%20ID%20%20%7C%20%20NUM%20%20%7C%20%20%28%20arithexpr%20%29&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0)