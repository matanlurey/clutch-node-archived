import { Token, Type } from '../../lexer/token';
import { Statement } from '../ast/ast';
import { ReturnStatement } from '../ast/statement/return';
import { VariableDefinition } from '../ast/statement/variable';
import { ExpressionParser } from './expression';

/**
 * Partially implementations parsing, just for expressions.
 *
 * Exists soley to be standalone testable, as well to be extended by the
 * expression parser, which needs the underlying capability to parse operators.
 */
export class StatementParser extends ExpressionParser {
  parseStatement(): Statement {
    if (this.match([Type.keyword, 'return'])) {
      return this.parseReturn(this.previous());
    }
    if (this.match([Type.keyword, 'let'])) {
      return this.parseVariable(this.previous());
    } else {
      return this.parseExpression();
    }
  }

  protected parseVariable(keyword: Token): VariableDefinition {
    const name = this.parseIdentifier();
    const type = this.match([Type.symbol, ':'])
      ? this.parseIdentifier()
      : undefined;
    const value = this.match([Type.operator, '='])
      ? this.parseExpression()
      : undefined;
    return this.factory.createVariableDefinition(keyword, name, type, value);
  }

  private parseReturn(keyword: Token): ReturnStatement {
    return this.factory.createReturnStatement(keyword, this.parseExpression());
  }
}
