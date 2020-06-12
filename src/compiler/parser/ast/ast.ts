import { $Recovery, Token } from '../../lexer/token';
import { AstVisitor } from '../visitor/visitor';

export abstract class AstNode {
  /**
   * Visits the current @see AstNode.
   *
   * @param visitor
   * @param context
   */
  abstract accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R;

  /**
   * First token that represents this AST node.
   */
  abstract get firstToken(): Token;

  /**
   * Last token that represents this AST node.
   */
  abstract get lastToken(): Token;
}

/**
 * Represents a simple AST Node that originates from a single token only.
 */
export abstract class SimpleNode extends AstNode {
  constructor(readonly firstToken: Token) {
    super();
  }

  get lastToken(): Token {
    return this.firstToken;
  }
}

/**
 *
 */
export class RecoveryNode extends SimpleNode {
  constructor(offset: number) {
    super(new Token(offset, $Recovery, ''));
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitRecoveryNode(this, context);
  }
}

/**
 * Supported operators.
 */
export enum OperatorType {
  UnaryNegative,
  UnaryPositive,
  Negation,
  Addition,
  Subtraction,
  Multiplication,
  Division,
  Remainder,
  Equality,
  Inequality,
  Assignment,
  InvalidOrError,
}

/**
 * Valid binary operator types.
 */
export type BinaryOperator =
  | OperatorType.Addition
  | OperatorType.Subtraction
  | OperatorType.Multiplication
  | OperatorType.Division
  | OperatorType.Remainder
  | OperatorType.Equality
  | OperatorType.Inequality
  | OperatorType.Assignment;

/**
 * Valid prefix operator types.
 */
export type PrefixOperator =
  | OperatorType.UnaryNegative
  | OperatorType.UnaryPositive
  | OperatorType.Negation;

/**
 * Represents a marker type of AST nodes for all declarations.
 */
export abstract class Declaration extends AstNode {}

/**
 * Represents a marker type of AST nodes for all statements.
 */
export abstract class Statement extends AstNode {}

/**
 * Represents a marker type of AST nodes for all expressions.
 */
export abstract class Expression extends AstNode {}
