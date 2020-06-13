import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';

/**
 * Represents a parenthesized expression.
 */
export class GroupExpression extends Expression {
  constructor(
    readonly leftParen: Token,
    readonly expression: Expression,
    readonly rightParen: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitGroupExpression(this, context);
  }

  get firstToken(): Token {
    return this.leftParen;
  }

  get lastToken(): Token {
    return this.rightParen;
  }
}
