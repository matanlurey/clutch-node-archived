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
export type Type = Literal | Marker;
