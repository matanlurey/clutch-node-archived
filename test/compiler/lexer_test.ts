import { Scanner } from '../../src/common/scanner';
import { Lexer } from '../../src/compiler/lexer/lexer';
import { Type } from '../../src/compiler/lexer/token';

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
    { offset: 0, type: Type.eof, lexeme: '' },
  ]);
});

describe('should scan a number: ', () => {
  it('0', () => {
    expect(tokenize('0')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: '0' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('95', () => {
    expect(tokenize('95')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: '95' },
      { offset: 2, type: Type.eof, lexeme: '' },
    ]);
  });

  it('3.14', () => {
    expect(tokenize('3.14')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: '3.14' },
      { offset: 4, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan a string: ', () => {
  it('empty', () => {
    expect(tokenize("''")).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: "''" },
      { offset: 2, type: Type.eof, lexeme: '' },
    ]);
  });

  it('single-line', () => {
    expect(tokenize("'Hello'")).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: "'Hello'" },
      { offset: 7, type: Type.eof, lexeme: '' },
    ]);
  });

  it('multi-line', () => {
    expect(tokenize("'Hello\nWorld'")).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: "'Hello\nWorld'" },
      { offset: 13, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan a boolean: ', () => {
  it('true', () => {
    expect(tokenize('true')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: 'true' },
      { offset: 4, type: Type.eof, lexeme: '' },
    ]);
  });

  it('false', () => {
    expect(tokenize('false')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.literal, lexeme: 'false' },
      { offset: 5, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan', () => {
  it('(', () => {
    expect(tokenize('(')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.pair, lexeme: '(' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it(')', () => {
    expect(tokenize(')')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.pair, lexeme: ')' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('{', () => {
    expect(tokenize('{')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.pair, lexeme: '{' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('}', () => {
    expect(tokenize('}')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.pair, lexeme: '}' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('.', () => {
    expect(tokenize('.')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.symbol, lexeme: '.' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('+', () => {
    expect(tokenize('+')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '+' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('-', () => {
    expect(tokenize('-')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '-' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('*', () => {
    expect(tokenize('*')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '*' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('/', () => {
    expect(tokenize('/')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '/' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('%', () => {
    expect(tokenize('%')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '%' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('=', () => {
    expect(tokenize('=')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '=' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('!', () => {
    expect(tokenize('!')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '!' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('!=', () => {
    expect(tokenize('!=')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.operator, lexeme: '!=' },
      { offset: 2, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan identifier', () => {
  it('[simple]', () => {
    expect(tokenize('a')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.identifier, lexeme: 'a' },
      { offset: 1, type: Type.eof, lexeme: '' },
    ]);
  });

  it('with an undescore', () => {
    expect(tokenize('a_b')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.identifier, lexeme: 'a_b' },
      { offset: 3, type: Type.eof, lexeme: '' },
    ]);
  });

  it('with a number', () => {
    expect(tokenize('a2')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.identifier, lexeme: 'a2' },
      { offset: 2, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan keywords', () => {
  it('let', () => {
    expect(tokenize('let')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.keyword, lexeme: 'let' },
      { offset: 3, type: Type.eof, lexeme: '' },
    ]);
  });

  it('func', () => {
    expect(tokenize('func')).toEqual<Tokenish[]>([
      { offset: 0, type: Type.keyword, lexeme: 'func' },
      { offset: 4, type: Type.eof, lexeme: '' },
    ]);
  });
});

describe('should scan', () => {
  function tokens(input: string): string[] {
    return tokenize(input).map((t) => `${t.type}: ${t.lexeme}`);
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
      'eof: ',
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
      'eof: ',
    ]);
  });
});
