/* eslint-disable @typescript-eslint/ban-types */
/**
 * Represents a scanned token during the lexing phase.
 */
export class Token<T extends Type = Type> {
  static readonly identifier = 'identifier';
  static readonly operator = 'operator';
  static readonly pair = 'pair';
  static readonly recovery = 'recovery';
  static readonly symbol = 'symbol';

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

export enum Type {
  eof = 'eof',
  identifier = 'identifier',
  keyword = 'keyword',
  literal = 'literal',
  operator = 'operator',
  pair = 'pair',
  recover = 'recovery',
  symbol = 'symbol',
}
