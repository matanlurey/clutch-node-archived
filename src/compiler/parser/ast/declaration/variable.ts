/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { Declaration, Expression } from '../ast';
import { AstVisitor } from '../visitor';
import { TypeDefinition } from './type';

/**
 * Represents a variable declaration.
 */
export class VariableDeclaration extends Declaration {
  /**
   * Creates a new variable declaration.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param letToken Token "let".
   * @param nameToken Name of the variable.
   * @param type If the variable has an explicit type, the type.
   * @param initalValue If the variable has an initial value, the expression.
   */
  constructor(
    private readonly letToken: Token,
    private readonly nameToken: Token,
    readonly type?: TypeDefinition,
    readonly initalValue?: Expression,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitVariableDeclaration(this, context);
  }

  get firstToken(): Token {
    return this.letToken;
  }

  get lastToken(): Token {
    return (
      this.initalValue?.lastToken || this.type?.lastToken || this.nameToken
    );
  }

  get variableName(): string {
    return this.nameToken.lexeme;
  }
}
