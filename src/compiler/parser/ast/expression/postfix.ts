import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression, PostfixOperator } from '../ast';

/**
 * Represents a prefix expression.
 */
export class PostfixExpression extends Expression {
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
    readonly operator: PostfixOperator,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitPostfixExpression(this, context);
  }

  get firstToken(): Token {
    return this.expression.firstToken;
  }

  get lastToken(): Token {
    return this.operatorToken;
  }
}
