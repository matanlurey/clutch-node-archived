import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';

/**
 * Represents a call expression.
 */
export class CallExpression extends Expression {
  /**
   * Creates a new call expression.
   *
   * @param receiver Callable receiver.
   * @param parameters Parameters, if any.
   * @param lastToken `)` token.
   */
  constructor(
    readonly receiver: Expression,
    readonly parameters: Expression[],
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
