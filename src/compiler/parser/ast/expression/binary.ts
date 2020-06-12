import { Token } from '../../../lexer/token';
import { BinaryOperator, Expression } from '../ast';
import { AstVisitor } from '../visitor';

/**
 * Represents a binary expression.
 */
export class BinaryExpression extends Expression {
  /**
   * Creates a new binary expression.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param left Left-hand expression of the binary expression.
   * @param right Right-hand expression of the binary expression.
   * @param operator Operator as contextually parsed.
   */
  constructor(
    readonly left: Expression,
    readonly right: Expression,
    readonly operator: BinaryOperator,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitBinaryExpression(this, context);
  }

  get firstToken(): Token {
    return this.left.firstToken;
  }

  get lastToken(): Token {
    return this.right.lastToken;
  }
}
