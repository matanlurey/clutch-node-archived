import { Token, Type } from '../../lexer/token';
import { BinaryOperator, Expression, PrefixOperator } from '../ast/ast';
import { BinaryExpression } from '../ast/expression/binary';
import { Identifier } from '../ast/expression/identifier';
import { LiteralExpression } from '../ast/expression/literal';
import { PrefixExpression } from '../ast/expression/prefix';
import { DiagnosticCode } from '../diagnostic';
import { OperatorParser } from './operator';

export class ExpressionParser extends OperatorParser {
  parseExpression(): Expression {
    return this.parseAssignment();
  }

  /**
   * Parses an identifier, or reports an error and returns a synthetic identifier.
   */
  protected parseIdentifier(): Identifier {
    if (this.match(Type.identifier)) {
      return this.factory.createIdentifier(this.previous());
    }
    return this.fatalExpectedIdentifier(this.advance());
  }

  private parseAssignment():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(() => this.parseConditional(), [
      Type.operator,
      '=',
    ]);
  }

  private parseConditional():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseLogicalOr();
  }

  private parseLogicalOr():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseLogicalAnd();
  }

  private parseLogicalAnd():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseEquality();
  }

  private parseEquality():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(
      () => this.parseComparison(),
      [Type.operator, '=='],
      [Type.operator, '!='],
    );
  }

  private parseComparison():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseBitwiseShift();
  }

  private parseBitwiseShift():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseAdditive();
  }

  private parseAdditive():
    | BinaryExpression
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(
      () => this.parsePrefixExpression(),
      [Type.operator, '*'],
      [Type.operator, '/'],
      [Type.operator, '+'],
      [Type.operator, '-'],
    );
  }

  private parseBinaryHelper<E extends Expression>(
    parseNext: () => E,
    ...kinds: [Type, string][]
  ): E {
    let expression = parseNext();
    while (this.match(...kinds)) {
      const operator = this.matchBinaryOperator(this.previous());
      expression = (this.factory.createBinaryExpression(
        expression,
        parseNext(),
        operator as BinaryOperator,
      ) as unknown) as E;
    }
    return expression;
  }

  private parsePrefixExpression():
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parsePrefixHelper(
      () => this.parsePostfixExpression(),
      [Type.operator, '-'],
      [Type.operator, '+'],
      [Type.operator, '!'],
    );
  }

  private parsePrefixHelper<E extends Expression>(
    parseNext: () => E,
    ...kinds: (Type | [Type, string])[]
  ): E {
    if (this.match(...kinds)) {
      const token = this.previous();
      const operator = this.matchPrefixOperator(token);
      return (this.factory.createPrefixExpression(
        parseNext(),
        token,
        operator as PrefixOperator,
      ) as unknown) as E;
    }
    return parseNext();
  }

  private parsePostfixExpression():
    | PrefixExpression
    | LiteralExpression
    | Identifier {
    return this.parseFunctionCall();
  }

  private parseFunctionCall(): LiteralExpression | Identifier {
    return this.parseMemberAccess();
  }

  private parseMemberAccess(): LiteralExpression | Identifier {
    return this.parseGroup();
  }

  private parseGroup(): LiteralExpression | Identifier {
    return this.parseLiteral();
  }

  private parseLiteral(): LiteralExpression | Identifier {
    if (this.match(Type.literal)) {
      const token = this.previous();
      if (token.lexeme === 'true') {
        return this.factory.createLiteralBoolean(token, true);
      } else if (token.lexeme === 'false') {
        return this.factory.createLiteralBoolean(token, false);
      } else {
        return this.factory.createLiteralNumber(token, Number(token.lexeme));
      }
    } else {
      return this.parseIdentifier();
    }
  }

  private fatalExpectedIdentifier(token: Token): Identifier {
    this.reporter.reportToken(token, DiagnosticCode.SYNTAX_EXPECTED_IDENTIFIER);
    return this.factory.createIdentifier(token.asError());
  }
}
