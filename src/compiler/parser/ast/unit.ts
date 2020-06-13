import { Token } from '../../lexer/token';
import { AstVisitor } from '../visitor/visitor';
import { AstNode, Declaration } from './ast';

export class CompilationUnit extends AstNode {
  constructor(
    readonly declarations: Declaration[],
    private readonly eof: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitCompilationUnit(this, context);
  }

  get firstToken(): Token {
    return this.declarations[0]?.firstToken || this.eof;
  }

  get lastToken(): Token {
    return this.eof;
  }
}
