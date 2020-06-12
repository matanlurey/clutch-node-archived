/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../../lexer/token';
import { AstNode, Statement } from '../ast';
import { AstVisitor } from '../visitor';

/**
 * Represents a statement block.
 */
export class StatementBlock extends AstNode {
  /**
   * Creates a new statement block.
   *
   * This constructor is not intended to be used directly; @see AstFactory.
   *
   * @param firstToken Open curly brace.
   * @param lastToken Closed curly brace.
   * @param statements Statements.
   */
  constructor(
    readonly firstToken: Token,
    readonly lastToken: Token,
    readonly statements: Statement[],
  ) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitStatementBlock(this, context);
  }
}
