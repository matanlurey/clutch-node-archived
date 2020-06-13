import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { AstNode, Declaration } from '../ast';
import { Identifier } from '../expression/identifier';

/**
 * Root of module(s), often considered a full source file.
 */
export class ModuleRoot extends AstNode {
  /**
   * Creates a new module root declaration.
   *
   * @param modules List of modules in the file. Often this is a single module.
   * @param endOfFile End of file token.
   */
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

/**
 * Module declaration, often implicit.
 */
export class ModuleDeclaration extends Declaration {
  /**
   * Create a new module declaration.
   *
   * @param declarations Top-level declarations in the file.
   * @param keyword If explicit, the `module` keyword.
   * @param name If explicit, and if explicitly defined, the name of the module.
   * @param endBlock If a block, the `}` token/symbol.
   */
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
