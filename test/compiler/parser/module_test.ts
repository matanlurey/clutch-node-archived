import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import { DiagnosticReporter } from '../../../src/compiler/parser/diagnostic';
import { ModuleParser } from '../../../src/compiler/parser/parser/module';
import { Humanizer } from '../../../src/compiler/parser/visitor/humanizer';

function parser(program: string): ModuleParser {
  const source = new SourceFile(program, 'operator_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source, (): void => {
    // Ignore.
  });
  return new ModuleParser(tokens, reporter);
}

describe('should', () => {
  const humanizer = new Humanizer();

  function parse(program: string): string {
    return parser(program).parseModuleRoot().accept(humanizer).toString();
  }

  it('parse an empty file', () => {
    expect(parse('')).toBe('');
  });

  it('parses a top-level variable', () => {
    expect(parse('let x')).toBe('let x');
  });

  it('parses a function', () => {
    expect(parse('func x')).toBe('func x');
  });
});
