import { Token } from '../../../lexer/token';
import { Expression } from '../ast';
import { AstVisitor } from '../visitor';

/**
 * Represents an identifier.
 */
export class Identifier extends Expression {
  /**
   * Creates a new identifier.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param token Token used to define the name.
   */
  constructor(private readonly token: Token) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitIdentifier(this, context);
  }

  get firstToken(): Token {
    return this.token;
  }

  get lastToken(): Token {
    return this.token;
  }

  /**
   * Name of the identifier.
   */
  get name(): string {
    return this.token.lexeme;
  }
}