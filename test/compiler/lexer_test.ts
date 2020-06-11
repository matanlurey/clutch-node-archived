import { Scanner } from '../../src/common/scanner';
import { Lexer } from '../../src/compiler/lexer/lexer';
import {
  $Add,
  $Assign,
  $Boolean,
  $CloseCurly,
  $CloseParen,
  $Divide,
  $Dot,
  $EOF,
  $Modulus,
  $Multiply,
  $Not,
  $NotEquals,
  $Number,
  $OpenCurly,
  $OpenParen,
  $Subtract as $Minus,
  Type,
} from '../../src/compiler/lexer/tokens';

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

describe('should scan a boolean: ', () => {
  it('true', () => {
    expect(tokenize('true')).toEqual<Tokenish[]>([
      { offset: 0, type: $Boolean, lexeme: 'true' },
      { offset: 4, type: $EOF, lexeme: '' },
    ]);
  });

  it('false', () => {
    expect(tokenize('false')).toEqual<Tokenish[]>([
      { offset: 0, type: $Boolean, lexeme: 'false' },
      { offset: 5, type: $EOF, lexeme: '' },
    ]);
  });
});

describe('should scan', () => {
  it('(', () => {
    expect(tokenize('(')).toEqual<Tokenish[]>([
      { offset: 0, type: $OpenParen, lexeme: '(' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it(')', () => {
    expect(tokenize(')')).toEqual<Tokenish[]>([
      { offset: 0, type: $CloseParen, lexeme: ')' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('{', () => {
    expect(tokenize('{')).toEqual<Tokenish[]>([
      { offset: 0, type: $OpenCurly, lexeme: '{' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('}', () => {
    expect(tokenize('}')).toEqual<Tokenish[]>([
      { offset: 0, type: $CloseCurly, lexeme: '}' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('.', () => {
    expect(tokenize('.')).toEqual<Tokenish[]>([
      { offset: 0, type: $Dot, lexeme: '.' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('+', () => {
    expect(tokenize('+')).toEqual<Tokenish[]>([
      { offset: 0, type: $Add, lexeme: '+' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('-', () => {
    expect(tokenize('-')).toEqual<Tokenish[]>([
      { offset: 0, type: $Minus, lexeme: '-' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('*', () => {
    expect(tokenize('*')).toEqual<Tokenish[]>([
      { offset: 0, type: $Multiply, lexeme: '*' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('/', () => {
    expect(tokenize('/')).toEqual<Tokenish[]>([
      { offset: 0, type: $Divide, lexeme: '/' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('%', () => {
    expect(tokenize('%')).toEqual<Tokenish[]>([
      { offset: 0, type: $Modulus, lexeme: '%' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('=', () => {
    expect(tokenize('=')).toEqual<Tokenish[]>([
      { offset: 0, type: $Assign, lexeme: '=' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('!', () => {
    expect(tokenize('!')).toEqual<Tokenish[]>([
      { offset: 0, type: $Not, lexeme: '!' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('!=', () => {
    expect(tokenize('!=')).toEqual<Tokenish[]>([
      { offset: 0, type: $NotEquals, lexeme: '!=' },
      { offset: 2, type: $EOF, lexeme: '' },
    ]);
  });
});
