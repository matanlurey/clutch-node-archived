/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { Declaration } from '../ast';
import { StatementBlock } from '../statement/block';
import { AstVisitor } from '../visitor';
import { ParameterList } from './parameter';
import { TypeDefinition } from './type';

/**
 * Represents a function declaration.
 */
export class FunctionDeclaration extends Declaration {
  /**
   * Creates a new function declaration.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param funcToken Token "func".
   * @param nameToken Name of the function.
   * @param parameters If the function has parameters, the parameters.
   * @param returnType If the function has a return type, the return type.
   * @param statements If the function has a body, the statements.
   */
  constructor(
    private readonly funcToken: Token,
    private readonly nameToken: Token,
    readonly parameters?: ParameterList,
    readonly returnType?: TypeDefinition,
    readonly statements?: StatementBlock,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitFunctionDeclaration(this, context);
  }

  get firstToken(): Token {
    return this.funcToken;
  }

  get lastToken(): Token {
    return (
      this.statements?.lastToken ||
      this.returnType?.lastToken ||
      this.parameters?.lastToken ||
      this.nameToken
    );
  }

  /**
   * Name of the function.
   */
  get functionName(): string {
    return this.nameToken.lexeme;
  }
}
