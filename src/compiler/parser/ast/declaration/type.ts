/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { AstNode } from '../ast';
/**
 * Represents a type definition.
 */
export class TypeDefinition extends AstNode {
  /**
   * Creates a new type definition.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param firstToken Identifier for the type.
   */
  constructor(readonly firstToken: Token) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitTypeDefinition(this, context);
  }

  get lastToken(): Token {
    return this.firstToken;
  }

  /**
   * Name of the type.
   */
  get typeName(): string {
    return this.firstToken.lexeme;
  }
}
