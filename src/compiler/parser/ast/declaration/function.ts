/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Declaration } from '../ast';
import { Identifier } from '../expression/identifier';
import { StatementBlock } from '../statement/block';
import { ParameterList } from './parameter';

/**
 * Represents a function declaration.
 */
export class FunctionDeclaration extends Declaration {
  /**
   * Creates a new function declaration.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param keyword Token "func".
   * @param name Name of the function.
   * @param parameters If the function has parameters, the parameters.
   * @param returnType If the function has a return type, the return type.
   * @param statements If the function has a body, the statements.
   */
  constructor(
    private readonly keyword: Token,
    readonly name: Identifier,
    readonly parameters?: ParameterList,
    readonly returnType?: Identifier,
    readonly statements?: StatementBlock,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitFunctionDeclaration(this, context);
  }

  get firstToken(): Token {
    return this.keyword;
  }

  get lastToken(): Token {
    return (
      this.statements?.lastToken ||
      this.returnType?.lastToken ||
      this.parameters?.lastToken ||
      this.name.lastToken
    );
  }
}
