/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression, Statement } from '../ast';
import { Identifier } from '../expression/identifier';

/**
 * Represents a variable declaration.
 */
export class VariableDefinition extends Statement {
  /**
   * Creates a new variable declaration.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param define Token "let".
   * @param nameToken Name of the variable.
   * @param type If the variable has an explicit type, the type.
   * @param initalValue If the variable has an initial value, the expression.
   */
  constructor(
    private readonly define: Token,
    readonly name: Identifier,
    readonly type?: Identifier,
    readonly initalValue?: Expression,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitVariableDefinition(this, context);
  }

  get firstToken(): Token {
    return this.define;
  }

  get lastToken(): Token {
    return (
      this.initalValue?.lastToken || this.type?.lastToken || this.name.lastToken
    );
  }
}
