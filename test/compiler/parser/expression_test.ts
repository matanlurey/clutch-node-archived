import { Scanner } from '../../../src/common/scanner';
import { SourceFile } from '../../../src/common/source';
import { Lexer } from '../../../src/compiler/lexer/lexer';
import {
  DiagnosticError,
  DiagnosticReporter,
} from '../../../src/compiler/parser/diagnostic';
import { ExpressionParser } from '../../../src/compiler/parser/parser/expression';
import { HumanWriterVisitor } from '../../../src/compiler/parser/visitor/humanizer';

function parser(program: string): ExpressionParser {
  const source = new SourceFile(program, 'expression_test.ts');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const reporter = new DiagnosticReporter(source);
  return new ExpressionParser(tokens, reporter);
}

describe('should', () => {
  const humanizer = new HumanWriterVisitor();

  function parse(program: string): string {
    return parser(program).parseExpression().accept(humanizer).toString();
  }

  it('parse member access', () => {
    expect(parse('a.b')).toBe('a.b');
    expect(parse('a.b.c')).toBe('a.b.c');
  });

  it('parse function calls', () => {
    expect(parse('a()')).toBe('a()');
    expect(parse('a(b)')).toBe('a(b)');
    expect(parse('a(b, c)')).toBe('a(b, c)');
    expect(parse('a()()')).toBe('a()()');
    expect(parse('print()')).toBe('print()');
  });

  it('parse ||', () => {
    expect(parse('a || b')).toBe('a || b');
  });

  it('parse &&', () => {
    expect(parse('a && b')).toBe('a && b');
  });

  it('parse prefixes', () => {
    expect(parser('--a').parseExpression()).toMatchInlineSnapshot(`
      PrefixExpression {
        "expression": Identifier {
          "token": Token {
            "error": false,
            "lexeme": "a",
            "offset": 2,
            "type": "identifier",
          },
        },
        "operator": "--",
        "operatorToken": Token {
          "error": false,
          "lexeme": "--",
          "offset": 0,
          "type": "operator",
        },
      }
    `);
    expect(parse('--a')).toBe('--a');
    expect(parse('++a')).toBe('++a');
  });

  it('parse postfixes', () => {
    expect(parser('a--').parseExpression()).toMatchInlineSnapshot(`
      PostfixExpression {
        "expression": Identifier {
          "token": Token {
            "error": false,
            "lexeme": "a",
            "offset": 0,
            "type": "identifier",
          },
        },
        "operator": "--",
        "operatorToken": Token {
          "error": false,
          "lexeme": "--",
          "offset": 1,
          "type": "operator",
        },
      }
    `);
    expect(parse('a--')).toBe('a--');
    expect(parse('a++')).toBe('a++');
  });

  it('parse comparisons', () => {
    expect(parse('a > b')).toBe('a > b');
    expect(parse('a < b')).toBe('a < b');
    expect(parse('a >= b')).toBe('a >= b');
    expect(parse('a <= b')).toBe('a <= b');
  });

  it('parse bitwise shift', () => {
    expect(parse('a >> b')).toBe('a >> b');
    expect(parse('a << b')).toBe('a << b');
  });

  it('parse conditional', () => {
    expect(parse('if a then b else c')).toBe('if a then b else c');
  });

  it('parse group', () => {
    expect(parse('(a)')).toBe('(a)');
  });

  it('fail on invalid context [expected identifier]', () => {
    expect(() => parse('func')).toThrowError(DiagnosticError);
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

  it('parse string', () => {
    expect(parse("''")).toBe("''");
    expect(parse("'Hello'")).toBe("'Hello'");
    expect(parse("'Hello\nWorld'")).toBe("'Hello\nWorld'");
  });

  it('parse prefix expression', () => {
    expect(parser('!true').parseExpression()).toMatchInlineSnapshot(`
      PrefixExpression {
        "expression": LiteralBoolean {
          "literal": Token {
            "error": false,
            "lexeme": "true",
            "offset": 1,
            "type": "literal",
          },
          "value": true,
        },
        "operator": "!",
        "operatorToken": Token {
          "error": false,
          "lexeme": "!",
          "offset": 0,
          "type": "operator",
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
            "type": "identifier",
          },
        },
        "operator": "+",
        "right": Identifier {
          "token": Token {
            "error": false,
            "lexeme": "b",
            "offset": 4,
            "type": "identifier",
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
