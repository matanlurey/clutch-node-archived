import { Token, Type } from '../../lexer/token';
import { Declaration, Expression, Statement } from '../ast/ast';
import { FunctionDeclaration } from '../ast/declaration/function';
import { ModuleDeclaration, ModuleRoot } from '../ast/declaration/module';
import { Parameter, ParameterList } from '../ast/declaration/parameter';
import { Identifier } from '../ast/expression/identifier';
import { StatementBlock } from '../ast/statement/block';
import { DiagnosticCode } from '../diagnostic';
import { StatementParser } from './statement';

export class ModuleParser extends StatementParser {
  /**
   * Parses a module root (e.g. a file).
   */
  parseModuleRoot(): ModuleRoot {
    return this.factory.createModuleRoot(
      [this.parseModuleDeclaration()],
      this.program[this.program.length - 1],
    );
  }

  /**
   * Parses a module.
   */
  private parseModuleDeclaration(): ModuleDeclaration {
    const delcarations: Declaration[] = [];
    while (this.hasNext) {
      const topLevel = this.parseTopLevelDeclaration();
      if (topLevel) {
        delcarations.push(topLevel);
      } else {
        break;
      }
    }
    return this.factory.createModuleDeclaration(delcarations);
  }

  /**
   * Parses a top-level declaration.
   *
   * If there are none remaining, returns undefined.
   */
  private parseTopLevelDeclaration(): Declaration | undefined {
    if (this.match([Type.keyword, 'func'])) {
      return this.parseFunctionDeclaration(this.previous());
    } else if (this.match([Type.keyword, 'let'])) {
      return this.parseVariable(this.previous());
    } else if (this.hasNext) {
      this.reporter.reportOffset(
        this.peek().offset,
        1,
        DiagnosticCode.SYNTAX_EXPECTED_DECLARATION,
      );
    } else {
      return;
    }
  }

  /**
   * Parses a function declaration.
   *
   * @param keyword The "func" keyword.
   */
  private parseFunctionDeclaration(keyword: Token): FunctionDeclaration {
    const name = this.parseIdentifier();
    const params = this.parseParameterList();
    return this.factory.createFunctionDeclaration(
      keyword,
      name,
      params,
      this.match([Type.symbol, ':']) ? this.parseIdentifier() : undefined,
      this.match([Type.symbol, '->']) ? this.parseStatementBlock() : undefined,
    );
  }

  /**
   * Parses a paremeter list.
   */
  private parseParameterList(): ParameterList {
    let leftParen!: Token;
    if (this.match([Type.pair, '('])) {
      leftParen = this.previous();
    } else {
      leftParen = this.recover(
        DiagnosticCode.SYNTAX_EXPECTED_PARENTHESES,
        Type.operator,
        '(',
      );
    }
    const params: Parameter[] = [];
    while (this.hasNext && !this.match([Type.pair, ')'])) {
      params.push(this.parseParameter());
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
      rightParen = this.recover(
        DiagnosticCode.SYNTAX_EXPECTED_PARENTHESES,
        Type.pair,
        ')',
      );
    }
    rightParen = this.previous();
    return this.factory.createParameterList(leftParen, params, rightParen);
  }

  /**
   * Parses a parameter.
   */
  private parseParameter(): Parameter {
    const name = this.parseIdentifier();
    let type: Identifier | undefined;
    if (this.match([Type.symbol, ':'])) {
      type = this.parseIdentifier();
    }
    let value: Expression | undefined;
    if (this.match([Type.operator, '='])) {
      value = this.parseExpression();
    }
    return new Parameter(name, type, value);
  }

  /**
   * Parses a statement block.
   */
  private parseStatementBlock(): StatementBlock {
    let open: Token;
    if (this.match([Type.pair, '{'])) {
      open = this.previous();
    } else {
      open = this.recover(DiagnosticCode.SYNTAX_EXPECTED_CURLY, Type.pair, '{');
    }
    const statements: Statement[] = [];
    while (this.hasNext && !this.match([Type.pair, '}'])) {
      statements.push(this.parseStatement());
    }
    let close = this.previous();
    if (close.lexeme !== '}') {
      close = this.recover(
        DiagnosticCode.SYNTAX_EXPECTED_CURLY,
        Type.pair,
        ')',
      );
    } else {
      close = this.previous();
    }
    return this.factory.createStatementBlock(open, close, statements);
  }
}
