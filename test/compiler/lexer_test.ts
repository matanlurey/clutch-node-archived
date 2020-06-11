import { Scanner } from '../../src/common/scanner';
import { Lexer } from '../../src/compiler/lexer/lexer';
import { $EOF, $Number, Type } from '../../src/compiler/lexer/tokens';

let lexer!: Lexer;

function tokenize(program: string): Tokenish[] {
  return lexer.tokenize(new Scanner(program)).map((t) => {
    return {
      offset: t.offset,
      type: t.type,
      lexeme: t.lexeme,
    };
  });
}

type Tokenish = {
  readonly offset: number;
  readonly type: Type;
  readonly lexeme: string;
};

beforeEach(() => {
  lexer = new Lexer();
});

test('should scan an empty file', () => {
  expect(tokenize('')).toEqual<Tokenish[]>([
    { offset: 0, type: $EOF, lexeme: '' },
  ]);
});

describe('should scan a number: ', () => {
  it('0', () => {
    expect(tokenize('0')).toEqual<Tokenish[]>([
      { offset: 0, type: $Number, lexeme: '0' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('95', () => {
    expect(tokenize('95')).toEqual<Tokenish[]>([
      { offset: 0, type: $Number, lexeme: '95' },
      { offset: 2, type: $EOF, lexeme: '' },
    ]);
  });

  it('3.14', () => {
    expect(tokenize('3.14')).toEqual<Tokenish[]>([
      { offset: 0, type: $Number, lexeme: '3.14' },
      { offset: 4, type: $EOF, lexeme: '' },
    ]);
  });
});

describe('should reject invalid numbers: ', () => {
  it('3.1.4', () => {
    expect(() => tokenize('3.1.4')).toThrowError('"." at 3');
  });

  it('30a', () => {
    expect(() => tokenize('30a')).toThrowError('"a" at 2');
  });

  it('3.a', () => {
    expect(() => tokenize('3.a')).toThrowError('"a" at 2');
  });
});
