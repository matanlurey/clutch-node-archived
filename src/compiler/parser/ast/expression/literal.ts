import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';

/**
 * Represents a literal (constant) expression.
 */
export abstract class LiteralExpression<
  V extends boolean | number | string = boolean | number | string
> extends Expression {
  constructor(protected readonly literal: Token) {
    super();
  }

  get firstToken(): Token {
    return this.literal;
  }

  get lastToken(): Token {
    return this.literal;
  }

  /**
   * Value of the expression (as parsed).
   */
  abstract get value(): V;
}

/**
 * Represents a literael boolean.
 */
export class LiteralBoolean extends LiteralExpression<boolean> {
  /**
   * Creates a literal boolean expression.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param literal Token as parsed.
   * @param value Value as parsed.
   */
  constructor(literal: Token, readonly value: boolean) {
    super(literal);
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitLiteralBoolean(this, context);
  }
}

/**
 * Represents a literal number.
 */
export class LiteralNumber extends LiteralExpression<number> {
  /**
   * Creates a literal boolean expression.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param literal Token as parsed.
   * @param value Value as parsed.
   */
  constructor(literal: Token, readonly value: number) {
    super(literal);
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitLiteralNumber(this, context);
  }
}
