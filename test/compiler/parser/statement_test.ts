import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import { DiagnosticReporter } from '../../../src/compiler/parser/diagnostic';
import { StatementParser } from '../../../src/compiler/parser/parser/statement';
import { Humanizer } from '../../../src/compiler/parser/visitor/humanizer';

function parser(program: string): StatementParser {
  const source = new SourceFile(program, 'operator_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source, (): void => {
    // Ignore.
  });
  return new StatementParser(tokens, reporter);
}

describe('should', () => {
  const humanizer = new Humanizer();

  function parse(program: string): string {
    return parser(program).parseStatement().accept(humanizer).toString();
  }

  it('parse return statement', () => {
    expect(parse('return x')).toBe('return x');
  });

  it('parse variable', () => {
    expect(parse('let x')).toBe('let x');
  });

  it('parse variable with a type', () => {
    expect(parse('let x: Y')).toBe('let x: Y');
  });

  it('parse variable with an initial value', () => {
    expect(parse('let x = y')).toBe('let x = y');
  });

  it('parse variable with a type and an initial value', () => {
    expect(parse('let x: Y = z')).toBe('let x: Y = z');
  });
});
