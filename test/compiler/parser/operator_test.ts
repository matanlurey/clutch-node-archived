import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import { Token } from '../../../src/compiler/lexer/token';
import { OperatorType } from '../../../src/compiler/parser/ast/ast';
import { DiagnosticReporter } from '../../../src/compiler/parser/diagnostic';
import { OperatorParser } from '../../../src/compiler/parser/parser/operator';

function parser(program: string): OperatorParser {
  const source = new SourceFile(program, 'operator_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source, (): void => {
    // Ignore.
  });
  return new OperatorParser(tokens, reporter);
}

describe('should find a valid binary operator', () => {
  function parse(operator: string): OperatorType {
    return parser(operator).matchBinaryOperator(
      new Token(
        0,
        {
          kind: 'operator',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name: operator as any,
        },
        operator,
        false,
      ),
    );
  }

  it('+', () => {
    expect(parse('+')).toBe(OperatorType.Addition);
  });

  it('-', () => {
    expect(parse('-')).toBe(OperatorType.Subtraction);
  });

  it('*', () => {
    expect(parse('*')).toBe(OperatorType.Multiplication);
  });

  it('/', () => {
    expect(parse('/')).toBe(OperatorType.Division);
  });

  it('%', () => {
    expect(parse('%')).toBe(OperatorType.Remainder);
  });

  it('=', () => {
    expect(parse('=')).toBe(OperatorType.Assignment);
  });

  it('==', () => {
    expect(parse('==')).toBe(OperatorType.Equality);
  });

  it('!=', () => {
    expect(parse('!=')).toBe(OperatorType.Inequality);
  });

  it('[should reject unknown]', () => {
    expect(parse('!')).toBe(OperatorType.InvalidOrError);
  });
});

describe('should find a valid prefix operator', () => {
  function parse(operator: string): OperatorType {
    return parser(operator).matchPrefixOperator(
      new Token(
        0,
        {
          kind: 'operator',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name: operator as any,
        },
        operator,
        false,
      ),
    );
  }

  it('+', () => {
    expect(parse('+')).toBe(OperatorType.UnaryPositive);
  });

  it('-', () => {
    expect(parse('-')).toBe(OperatorType.UnaryNegative);
  });

  it('!', () => {
    expect(parse('!')).toBe(OperatorType.Negation);
  });

  it('[should reject unknown]', () => {
    expect(parse('*')).toBe(OperatorType.InvalidOrError);
  });
});
