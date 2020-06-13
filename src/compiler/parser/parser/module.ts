import { Token, Type } from '../../lexer/token';
import { Declaration, Statement } from '../ast/ast';
import { FunctionDeclaration } from '../ast/declaration/function';
import { ModuleDeclaration, ModuleRoot } from '../ast/declaration/module';
import { StatementBlock } from '../ast/statement/block';
import { DiagnosticCode } from '../diagnostic';
import { StatementParser } from './statement';

export class ModuleParser extends StatementParser {
  parseModuleRoot(): ModuleRoot {
    return this.factory.createModuleRoot(
      [this.parseModuleDeclaration()],
      this.program[this.program.length - 1],
    );
  }

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

  private parseTopLevelDeclaration(): Declaration | undefined {
    if (this.match([Type.keyword, 'func'])) {
      return this.parseFunction(this.previous());
    } else if (this.match([Type.keyword, 'let'])) {
      return this.parseVariable(this.previous());
    } else {
      return;
    }
  }

  private parseFunction(keyword: Token): FunctionDeclaration {
    const name = this.parseIdentifier();
    if (this.match([Type.pair, '('])) {
      throw new Error(`UNIMPLEMENTED: Parameters`);
    }
    return this.factory.createFunctionDeclaration(
      keyword,
      name,
      undefined,
      this.match([Type.symbol, ':']) ? this.parseIdentifier() : undefined,
      this.match([Type.symbol, '->']) ? this.parseStatementBlock() : undefined,
    );
  }

  private parseStatementBlock(): StatementBlock {
    let open: Token;
    if (this.match([Type.pair, '{'])) {
      open = this.previous();
    } else {
      open = this.peek(1).asError('{');
      this.reporter.reportToken(
        this.peek(1),
        DiagnosticCode.SYNTAX_EXPECTED_CURLY,
      );
    }
    const statements: Statement[] = [];
    // TODO: Implement statements.
    return this.factory.createStatementBlock(open, this.previous(), statements);
  }
}
