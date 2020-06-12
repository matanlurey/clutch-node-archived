/* eslint-disable @typescript-eslint/ban-types */
/**
 * Represents a scanned token during the lexing phase.
 */
export class Token<T extends Type = Type> {
  /**
   * Creates a new scanned token.
   * @param offset Offset the token starts at.
   * @param type Type of token scanned.
   * @param lexeme Textual representation of the token.
   */
  constructor(
    readonly offset: number,
    readonly type: T,
    readonly lexeme: string,
    readonly error = false,
  ) {}

  get length(): number {
    return this.lexeme.length;
  }

  asError(lexme = 'ಠ_ಠ'): Token {
    return new Token(this.offset, this.type, lexme, true);
  }
}

export const $Recovery: Recovery = {
  kind: 'recovery',
};

export interface Recovery {
  readonly kind: 'recovery';
}

export const $Exclaim: Operator = {
  kind: 'operator',
  name: '!',
};

export const $Plus: Operator = {
  kind: 'operator',
  name: '+',
};

export const $Minus: Operator = {
  kind: 'operator',
  name: '-',
};

export const $Star: Operator = {
  kind: 'operator',
  name: '*',
};

export const $Slash: Operator = {
  kind: 'operator',
  name: '/',
};

export const $Percent: Operator = {
  kind: 'operator',
  name: '%',
};

export const $Equals: Operator = {
  kind: 'operator',
  name: '=',
};

export const $EqualsEquals: Operator = {
  kind: 'operator',
  name: '==',
};

export const $ExclaimEquals: Operator = {
  kind: 'operator',
  name: '!=',
};

export interface Operator {
  readonly kind: 'operator';
  readonly name: '.' | '!' | '+' | '-' | '*' | '/' | '%' | '=' | '==' | '!=';
}

// -----------------------------------------------------------------------------

export interface Pair {
  readonly kind: 'pair';
  readonly name: '(' | ')' | '{' | '}' | '<' | '>';
}

export const $OpenParen: Pair = {
  kind: 'pair',
  name: '(',
};

export const $CloseParen: Pair = {
  kind: 'pair',
  name: ')',
};

export const $OpenCurly: Pair = {
  kind: 'pair',
  name: '{',
};

export const $CloseCurly: Pair = {
  kind: 'pair',
  name: '}',
};

export const $OpenAngle: Pair = {
  kind: 'pair',
  name: '<',
};

export const $CloseAngle: Pair = {
  kind: 'pair',
  name: '>',
};

// -----------------------------------------------------------------------------

export interface Symbol {
  readonly kind: 'symbol';
}

export const $Dot: Symbol = {
  kind: 'symbol',
};

export const $Arrow: Symbol = {
  kind: 'symbol',
};

export const $Colon: Symbol = {
  kind: 'symbol',
};

// -----------------------------------------------------------------------------

export interface Identifier {
  readonly kind: 'identifier';
}

export const $Identifier: Identifier = {
  kind: 'identifier',
};

export interface Keyword {
  readonly kind: 'keyword';
  readonly name: string;
}

export const $Func: Keyword = {
  kind: 'keyword',
  name: 'func',
};

export const $Let: Keyword = {
  kind: 'keyword',
  name: 'let',
};

// -----------------------------------------------------------------------------

export interface Literal<T = 'Boolean' | 'String' | 'Number'> {
  readonly kind: 'literal';
  readonly name: T;
}

export const $Boolean: Literal = {
  kind: 'literal',
  name: 'Boolean',
};

export const $Number: Literal = {
  kind: 'literal',
  name: 'Number',
};

export const $String: Literal = {
  kind: 'literal',
  name: 'String',
};

// -----------------------------------------------------------------------------

export interface Marker {
  readonly kind: 'marker';
  readonly name: string;
}

export const $EOF: Marker = {
  kind: 'marker',
  name: '<EOF>',
};

/**
 * Supported implementations of token types.
 */
export type Type =
  | Recovery
  | Identifier
  | Keyword
  | Literal
  | Marker
  | Operator
  | Pair
  | Symbol;
