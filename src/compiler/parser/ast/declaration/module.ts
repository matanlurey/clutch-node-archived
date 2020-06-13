import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { AstNode, Declaration } from '../ast';
import { Identifier } from '../expression/identifier';

export class ModuleRoot extends AstNode {
  constructor(
    readonly modules: ModuleDeclaration[],
    private readonly endOfFile: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitModuleRoot(this, context);
  }

  get firstToken(): Token {
    return this.modules[0]?.firstToken || this.endOfFile;
  }

  get lastToken(): Token {
    return this.modules[this.modules.length - 1]?.lastToken || this.endOfFile;
  }
}

export class ModuleDeclaration extends Declaration {
  constructor(
    readonly declarations: Declaration[],
    readonly keyword?: Token,
    readonly name?: Identifier,
    readonly endBlock?: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitModuleDeclaration(this, context);
  }

  get firstToken(): Token {
    return this.keyword || this.declarations[0]?.firstToken || this.endBlock;
  }

  get lastToken(): Token {
    return (
      this.endBlock ||
      this.declarations[this.declarations.length - 1]?.lastToken
    );
  }
}
