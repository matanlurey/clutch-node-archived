import { Token, Type } from '../../lexer/token';
import {
  BinaryOperator,
  Expression,
  PostfixOperator,
  PrefixOperator,
} from '../ast/ast';
import { BinaryExpression } from '../ast/expression/binary';
import { CallExpression } from '../ast/expression/call';
import { ConditionalExpression } from '../ast/expression/conditional';
import { GroupExpression } from '../ast/expression/group';
import { Identifier } from '../ast/expression/identifier';
import { LiteralExpression } from '../ast/expression/literal';
import { PostfixExpression } from '../ast/expression/postfix';
import { PrefixExpression } from '../ast/expression/prefix';
import { PropertyExpression } from '../ast/expression/property';
import { DiagnosticCode } from '../diagnostic';
import { OperatorParser } from './operator';

/**
 * Partially implementations parsing, just for expressions.
 *
 * Exists soley to be standalone testable, as well to be extended by the
 * statement parser, which needs the underlying capability to parse expressions.
 */
export class ExpressionParser extends OperatorParser {
  parseExpression(): Expression {
    return this.parseAssignment();
  }

  /**
   * Parses an identifier, or reports an error and returns an error identifier.
   */
  protected parseIdentifier(): Identifier {
    if (this.match(Type.identifier)) {
      return this.factory.createIdentifier(this.previous());
    }
    return this.fatalExpectedIdentifier(this.advance());
  }

  private parseAssignment():
    | ConditionalExpression
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(
      () => this.parseConditional(),
      [Type.operator, '='],
      [Type.operator, '+='],
      [Type.operator, '-='],
      [Type.operator, '*='],
      [Type.operator, '/='],
      [Type.operator, '%='],
    );
  }

  private parseConditional():
    | ConditionalExpression
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    if (this.match([Type.keyword, 'if'])) {
      const ifToken = this.previous();
      const condition = this.parseExpression();
      const thenToken = this.advance();
      if (thenToken.lexeme !== 'then') {
        this.reporter.reportToken(
          thenToken,
          DiagnosticCode.SYNTAX_EXPECTED_THEN,
        );
      }
      const thenExpr = this.parseExpression();
      const elseToken = this.advance();
      if (elseToken.lexeme !== 'else') {
        this.reporter.reportToken(
          elseToken,
          DiagnosticCode.SYNTAX_EXPECTED_ELSE,
        );
      }
      const elseExpr = this.parseExpression();
      return this.factory.createConditionalExpression(
        ifToken,
        condition,
        thenExpr,
        elseExpr,
      );
    }
    return this.parseLogicalOr();
  }

  private parseLogicalOr():
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(() => this.parseLogicalAnd(), [
      Type.operator,
      '||',
    ]);
  }

  private parseLogicalAnd():
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(() => this.parseEquality(), [
      Type.operator,
      '&&',
    ]);
  }

  private parseEquality():
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
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
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(
      () => this.parseBitwiseShift(),
      [Type.operator, '<'],
      [Type.operator, '>'],
      [Type.operator, '<='],
      [Type.operator, '>='],
    );
  }

  private parseBitwiseShift():
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parseBinaryHelper(
      () => this.parseAdditive(),
      [Type.operator, '<<'],
      [Type.operator, '>>'],
    );
  }

  private parseAdditive():
    | BinaryExpression
    | PrefixExpression
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
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
    ...kinds: (Type | [Type, string])[]
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
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parsePrefixHelper(
      () => this.parsePostfixExpression(),
      [Type.operator, '-'],
      [Type.operator, '+'],
      [Type.operator, '!'],
      [Type.operator, '--'],
      [Type.operator, '++'],
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
    | PostfixExpression
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    return this.parsePostfixHelper(
      () => this.parseFunctionCall(),
      [Type.operator, '++'],
      [Type.operator, '--'],
    );
  }

  private parsePostfixHelper<E extends Expression>(
    parseNext: () => E,
    ...kinds: [Type, string][]
  ): E {
    const maybeOperator = this.peek(1);
    if (
      kinds.some(
        (e) => e[0] === maybeOperator.type && e[1] === maybeOperator.lexeme,
      )
    ) {
      const expr = this.factory.createPostfixExpression(
        parseNext(),
        maybeOperator,
        this.matchPostfixOperator(maybeOperator) as PostfixOperator,
      );
      this.advance();
      return (expr as unknown) as E;
    }
    return parseNext();
  }

  private parseFunctionCall():
    | CallExpression
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    let expr:
      | CallExpression
      | PropertyExpression
      | GroupExpression
      | LiteralExpression
      | Identifier = this.parseMemberAccess();
    while (true) {
      if (this.match([Type.pair, '('])) {
        expr = this.finishFunctionCall(expr);
      } else {
        break;
      }
    }
    return expr;
  }

  private finishFunctionCall(receiver: Expression): CallExpression {
    const args: Expression[] = [];
    while (this.hasNext && !this.match([Type.pair, ')'])) {
      args.push(this.parseExpression());
      if (!this.match([Type.symbol, ','], [Type.pair, ')'])) {
        this.reporter.reportToken(
          this.peek(),
          DiagnosticCode.SYNATX_EXPECTED_COMMA,
        );
      } else {
        if (this.previous().lexeme === ')') {
          break;
        }
      }
    }
    let rightParen = this.previous();
    if (rightParen.lexeme !== ')') {
      this.reporter.reportToken(
        rightParen,
        DiagnosticCode.SYNTAX_EXPECTED_PARENTHESES,
      );
      rightParen = this.recover(
        DiagnosticCode.SYNTAX_EXPECTED_PARENTHESES,
        Type.operator,
        ')',
      );
    }
    return this.factory.createCallExpression(receiver, args, rightParen);
  }

  private parseMemberAccess():
    | PropertyExpression
    | GroupExpression
    | LiteralExpression
    | Identifier {
    let expr:
      | PropertyExpression
      | GroupExpression
      | LiteralExpression
      | Identifier = this.parseGroup();
    while (this.hasNext && this.match([Type.symbol, '.'])) {
      const name = this.parseIdentifier();
      expr = this.factory.createPropertyExpresson(expr, name);
    }
    return expr;
  }

  private parseGroup(): GroupExpression | LiteralExpression | Identifier {
    if (this.match([Type.pair, '('])) {
      const open = this.previous();
      const expr = this.parseExpression();
      let close = this.advance();
      if (close.lexeme !== ')') {
        this.reporter.reportToken(
          close,
          DiagnosticCode.SYNTAX_UNEXPECTED_TOKEN,
        );
        close = this.recover(
          DiagnosticCode.SYNTAX_EXPECTED_PARENTHESES,
          Type.operator,
          ')',
        );
      }
      return this.factory.createGroupExpression(open, expr, close);
    }
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
    return this.factory.createIdentifier(
      new Token(token.offset, Type.identifier, '', true),
    );
  }
}
