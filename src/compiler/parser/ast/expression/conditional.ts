import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';

/**
 * Represents a conditional expression.
 */
export class ConditionalExpression extends Expression {
  constructor(
    readonly firstToken: Token,
    readonly condition: Expression,
    readonly thenExpression: Expression,
    readonly elseExpression: Expression,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitConditionalExpression(this, context);
  }

  get lastToken(): Token {
    return this.elseExpression.lastToken;
  }
}
