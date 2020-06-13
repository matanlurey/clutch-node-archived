/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { AstNode, Expression } from '../ast';
import { Identifier } from '../expression/identifier';

/**
 * Represents a parameter within a @see ParameterList.
 */
export class Parameter extends AstNode {
  readonly firstToken: Token;

  /**
   * Creates a new parameter.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param nameToken Token that is the name of the parameter.
   * @param type If the parameter has a type, the type definition.
   * @param value If the parameter has an initial value, the expression.
   */
  constructor(
    private readonly nameToken: Token,
    readonly type?: Identifier,
    readonly value?: Expression,
  ) {
    super();
    this.firstToken = nameToken;
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitParameter(this, context);
  }

  get lastToken(): Token {
    return this.value?.lastToken || this.type?.lastToken || this.nameToken;
  }

  /**
   * Name of the parameter.
   */
  get name(): string {
    return this.nameToken.lexeme;
  }
}

/**
 * Represents a parmeter list within a @see FunctionDeclaration.
 */
export class ParameterList extends AstNode {
  /**
   * Creates a new parameter list.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param firstToken Open paraentheses.
   * @param parameters List of parameters.
   * @param lastToken Close parentheses.
   */
  constructor(
    readonly firstToken: Token,
    readonly parameters: Parameter[],
    readonly lastToken: Token,
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitParameterList(this, context);
  }
}
