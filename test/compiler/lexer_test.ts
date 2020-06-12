import { Scanner } from '../../src/common/scanner';
import { Lexer } from '../../src/compiler/lexer/lexer';
import {
  $Boolean,
  $CloseCurly,
  $CloseParen,
  $Dot,
  $EOF,
  $Equals,
  $Exclaim,
  $ExclaimEquals,
  $Func,
  $Identifier,
  $Let,
  $Minus,
  $Number,
  $OpenCurly,
  $OpenParen,
  $Percent,
  $Plus,
  $Slash,
  $Star,
  Type,
} from '../../src/compiler/lexer/token';

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
      { offset: 0, type: $Plus, lexeme: '+' },
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
      { offset: 0, type: $Star, lexeme: '*' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('/', () => {
    expect(tokenize('/')).toEqual<Tokenish[]>([
      { offset: 0, type: $Slash, lexeme: '/' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('%', () => {
    expect(tokenize('%')).toEqual<Tokenish[]>([
      { offset: 0, type: $Percent, lexeme: '%' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('=', () => {
    expect(tokenize('=')).toEqual<Tokenish[]>([
      { offset: 0, type: $Equals, lexeme: '=' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('!', () => {
    expect(tokenize('!')).toEqual<Tokenish[]>([
      { offset: 0, type: $Exclaim, lexeme: '!' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('!=', () => {
    expect(tokenize('!=')).toEqual<Tokenish[]>([
      { offset: 0, type: $ExclaimEquals, lexeme: '!=' },
      { offset: 2, type: $EOF, lexeme: '' },
    ]);
  });
});

describe('should scan identifier', () => {
  it('[simple]', () => {
    expect(tokenize('a')).toEqual<Tokenish[]>([
      { offset: 0, type: $Identifier, lexeme: 'a' },
      { offset: 1, type: $EOF, lexeme: '' },
    ]);
  });

  it('with an undescore', () => {
    expect(tokenize('a_b')).toEqual<Tokenish[]>([
      { offset: 0, type: $Identifier, lexeme: 'a_b' },
      { offset: 3, type: $EOF, lexeme: '' },
    ]);
  });

  it('with a number', () => {
    expect(tokenize('a2')).toEqual<Tokenish[]>([
      { offset: 0, type: $Identifier, lexeme: 'a2' },
      { offset: 2, type: $EOF, lexeme: '' },
    ]);
  });
});

describe('should scan keywords', () => {
  it('let', () => {
    expect(tokenize('let')).toEqual<Tokenish[]>([
      { offset: 0, type: $Let, lexeme: 'let' },
      { offset: 3, type: $EOF, lexeme: '' },
    ]);
  });

  it('func', () => {
    expect(tokenize('func')).toEqual<Tokenish[]>([
      { offset: 0, type: $Func, lexeme: 'func' },
      { offset: 4, type: $EOF, lexeme: '' },
    ]);
  });
});

describe('should scan', () => {
  function tokens(input: string): string[] {
    return tokenize(input).map((t) => `${t.type.kind}: ${t.lexeme}`);
  }

  it('function declaration', () => {
    expect(tokens('func main() -> {}')).toEqual([
      'keyword: func',
      'identifier: main',
      'pair: (',
      'pair: )',
      'symbol: ->',
      'pair: {',
      'pair: }',
      'marker: ',
    ]);
  });

  it('variable declaration', () => {
    expect(tokens('let a: B = c')).toEqual([
      'keyword: let',
      'identifier: a',
      'symbol: :',
      'identifier: B',
      'operator: =',
      'identifier: c',
      'marker: ',
    ]);
  });
});
