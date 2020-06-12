import { Token } from '../../../lexer/token';
import { Expression, PrefixOperator } from '../ast';
import { AstVisitor } from '../visitor';

/**
 * Represents a prefix expression.
 */
export class PrefixExpression extends Expression {
  /**
   * Creates a new prefix expression.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param expression Expression being prefixed.
   * @param operatorToken Operator token being used.
   * @param operator Operator as contextually parsed.
   */
  constructor(
    readonly expression: Expression,
    private readonly operatorToken: Token,
    readonly operator: PrefixOperator,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitPrefixExpression(this, context);
  }

  get firstToken(): Token {
    return this.operatorToken;
  }

  get lastToken(): Token {
    return this.expression.lastToken;
  }
}
