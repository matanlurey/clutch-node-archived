import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression, Statement } from '../ast';

export class ReturnStatement extends Statement {
  constructor(readonly keyword: Token, readonly expression: Expression) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitReturnStatement(this, context);
  }

  get firstToken(): Token {
    return this.keyword;
  }

  get lastToken(): Token {
    return this.expression.lastToken;
  }
}
