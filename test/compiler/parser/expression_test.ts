import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import { DiagnosticReporter } from '../../../src/compiler/parser/diagnostic';
import { ExpressionParser } from '../../../src/compiler/parser/parser/expression';
import { Humanizer } from '../../../src/compiler/parser/visitor/humanizer';

function parser(program: string): ExpressionParser {
  const source = new SourceFile(program, 'operator_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source, (): void => {
    // Ignore.
  });
  return new ExpressionParser(tokens, reporter);
}

describe('should', () => {
  const humanizer = new Humanizer();

  function parse(program: string): string {
    return parser(program).parseExpression().accept(humanizer).toString();
  }

  it('should fail on invalid context [expected identifier]', () => {
    expect(parse('func')).toBe('ಠ_ಠ');
  });

  it('parse identifiers', () => {
    expect(parse('foo')).toBe('foo');
  });

  it('parse number[s]', () => {
    expect(parse('3')).toBe('3');
    expect(parse('1.5')).toBe('1.5');
  });

  it('parse boolean', () => {
    expect(parse('true')).toBe('true');
    expect(parse('false')).toBe('false');
  });

  it('parse prefix expression', () => {
    expect(parser('!true').parseExpression()).toMatchInlineSnapshot(`
      PrefixExpression {
        "expression": LiteralBoolean {
          "literal": Token {
            "error": false,
            "lexeme": "true",
            "offset": 1,
            "type": Object {
              "kind": "literal",
              "name": "Boolean",
            },
          },
          "value": true,
        },
        "operator": 2,
        "operatorToken": Token {
          "error": false,
          "lexeme": "!",
          "offset": 0,
          "type": Object {
            "kind": "operator",
            "name": "!",
          },
        },
      }
    `);
    expect(parse('!true')).toBe('!true');
    expect(parse('-3')).toBe('-3');
    expect(parse('+1.5')).toBe('+1.5');
  });

  it('parse binary expression', () => {
    expect(parser('a + b').parseExpression()).toMatchInlineSnapshot(`
      BinaryExpression {
        "left": Identifier {
          "token": Token {
            "error": false,
            "lexeme": "a",
            "offset": 0,
            "type": Object {
              "kind": "identifier",
            },
          },
        },
        "operator": 3,
        "right": Identifier {
          "token": Token {
            "error": false,
            "lexeme": "b",
            "offset": 4,
            "type": Object {
              "kind": "identifier",
            },
          },
        },
      }
    `);
    expect(parse('a + b')).toBe('a + b');
    expect(parse('a - b')).toBe('a - b');
    expect(parse('a * b')).toBe('a * b');
    expect(parse('a / b')).toBe('a / b');
    expect(parse('a = b')).toBe('a = b');
    expect(parse('a == b')).toBe('a == b');
    expect(parse('a != b')).toBe('a != b');
  });
});
