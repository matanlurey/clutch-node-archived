import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';

/**
 * Represents a call expression.
 */
export class CallExpression extends Expression {
  constructor(
    readonly receiver: Expression,
    readonly argumentList: Expression[],
    readonly lastToken: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitCallExpression(this, context);
  }

  get firstToken(): Token {
    return this.receiver.firstToken;
  }
}
