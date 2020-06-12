import { Token, Type } from '../../lexer/token';
import { OperatorType } from '../ast/ast';
import { DiagnosticCode } from '../diagnostic';
import { AbstractParser } from './abstract';

/**
 * Partially implementations parsing, just for operator-based expressions.
 *
 * Exists soley to be standalone testable, as well to be extended by the
 * expression parser, which needs the underlying capability to parse operators.
 */
export class OperatorParser extends AbstractParser {
  private invalidOperator(token: Token): OperatorType {
    this.reporter.reportToken(token, DiagnosticCode.SYNTAX_INVALID_OPERATOR);
    return OperatorType.InvalidOrError;
  }

  public matchBinaryOperator(token: Token): OperatorType {
    if (token.type !== Type.operator) {
      return this.invalidOperator(token);
    }
    switch (token.lexeme) {
      case '+':
        return OperatorType.Addition;
      case '-':
        return OperatorType.Subtraction;
      case '*':
        return OperatorType.Multiplication;
      case '/':
        return OperatorType.Division;
      case '%':
        return OperatorType.Remainder;
      case '=':
        return OperatorType.Assignment;
      case '==':
        return OperatorType.Equality;
      case '!=':
        return OperatorType.Inequality;
      default:
        return this.invalidOperator(token);
    }
  }

  public matchPrefixOperator(token: Token): OperatorType {
    if (token.type !== Type.operator) {
      return this.invalidOperator(token);
    }
    switch (token.lexeme) {
      case '!':
        return OperatorType.Negation;
      case '-':
        return OperatorType.UnaryNegative;
      case '+':
        return OperatorType.UnaryPositive;
      default:
        return this.invalidOperator(token);
    }
  }
}
