/**
 * Represents a scanned token during the lexing phase.
 */
export class Token {
  /**
   * Creates a new scanned token.
   * @param offset Offset the token starts at.
   * @param type Type of token scanned.
   * @param lexeme Textual representation of the token.
   */
  constructor(
    readonly offset: number,
    readonly type: Type,
    readonly lexeme: string,
  ) {}
}

export const $Dot: Operator = {
  kind: 'operator',
  name: '.',
};

export const $Not: Operator = {
  kind: 'operator',
  name: '!',
};

export const $Add: Operator = {
  kind: 'operator',
  name: '+',
};

export const $Subtract: Operator = {
  kind: 'operator',
  name: '-',
};

export const $Multiply: Operator = {
  kind: 'operator',
  name: '*',
};

export const $Divide: Operator = {
  kind: 'operator',
  name: '/',
};

export const $Modulus: Operator = {
  kind: 'operator',
  name: '%',
};

export const $Assign: Operator = {
  kind: 'operator',
  name: '=',
};

export const $Equals: Operator = {
  kind: 'operator',
  name: '==',
};

export const $NotEquals: Operator = {
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

export interface Identifier {
  readonly kind: 'identifier';
}

export const $Identifier: Identifier = {
  kind: 'identifier',
};

// -----------------------------------------------------------------------------

export interface Literal {
  readonly kind: 'literal';
  readonly name: 'Boolean' | 'String' | 'Number';
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
export type Type = Identifier | Literal | Marker | Operator | Pair;
