import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import {
  DiagnosticError,
  DiagnosticReporter,
} from '../../../src/compiler/parser/diagnostic';
import { ModuleParser } from '../../../src/compiler/parser/parser/module';
import { HumanWriterVisitor } from '../../../src/compiler/parser/visitor/humanizer';

function parser(program: string): ModuleParser {
  const source = new SourceFile(program, 'module_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source);
  return new ModuleParser(tokens, reporter);
}

describe('should', () => {
  const humanizer = new HumanWriterVisitor();

  function parse(program: string): string {
    return parser(program).parseModuleRoot().accept(humanizer).toString();
  }

  it('parse an empty file', () => {
    expect(parse('')).toBe('');
  });

  it('parses a top-level variable', () => {
    expect(parse('let x')).toBe('let x');
  });

  it('parses a top-level variable with a type', () => {
    expect(parse('let x: X')).toBe('let x: X');
  });

  it('parses a top-level variable with a value', () => {
    expect(parse('let x = y')).toBe('let x = y');
  });

  it('parses a top-level variable with a type and value', () => {
    expect(parse('let x: X = y')).toBe('let x: X = y');
  });

  it('parses a function', () => {
    expect(parse('func x()')).toBe('func x()');
  });

  it('parses a function with a parameter', () => {
    expect(parse('func x(y: Z)')).toBe('func x(y: Z)');
  });

  it('parse a function with multiple parameters', () => {
    expect(parse('func x(a: A, b: B)')).toBe('func x(a: A, b: B)');
  });

  it('require parentheses for a function', () => {
    expect(() => parse('func x')).toThrowError(DiagnosticError);
  });

  it('parses a function with an empty body', () => {
    expect(parse('func main() -> {}')).toBe(`func main() -> {}`);
  });

  it('parses a function with a non-empty body', () => {
    expect(parse('func main() -> {\n' + "  print('Hello')\n" + '}\n')).toBe(
      'func main() -> {\n' + "  print('Hello')\n" + '}',
    );
  });
});
