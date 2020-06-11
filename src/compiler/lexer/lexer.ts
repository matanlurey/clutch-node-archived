import { Scanner } from '../../common/scanner';
import { Characters, isDigit, isWhiteSpace } from '../../common/string';
import { $EOF, $Number, Token, Type } from './tokens';

/**
 * Tokenizees and returns a program as a series of tokens.
 */
export class Lexer {
  private position!: number;
  private program!: Scanner;

  tokenize(program: Scanner): Token[] {
    this.position = 0;
    this.program = program;
    const scanned: Token[] = [];
    while (program.hasNext) {
      const token = this.scanToken();
      if (token) {
        scanned.push(token);
      }
    }
    scanned.push(this.createToken($EOF, ''));
    return scanned;
  }

  private scanToken(): Token | undefined {
    const character = this.program.advance();
    switch (character) {
      default:
        if (isWhiteSpace(character)) {
          this.position = this.program.position;
          break;
        }
        if (isDigit(character)) {
          return this.scanNumber();
        }
        this.error();
    }
    return;
  }

  /**
   * Scans any tokens that are valid numeric literals.
   *
   * @param start Initial character.
   */
  private scanNumber(): Token {
    // Scan until there are is a non-digit.
    while (this.program.hasNext) {
      const next = this.program.peek();
      if (this.program.match(Characters.$PERIOD)) {
        break;
      }
      if (!isDigit(next)) {
        break;
      }
      this.program.advance();
    }
    return this.scanDigits();
  }

  /**
   * Scans any tokens that are valid digits, returning a number.
   */
  private scanDigits(): Token {
    this.scanPredicate(isDigit);
    return this.createToken($Number);
  }

  /**
   * Scans until the EOF or until @param predicate returns false.
   */
  private scanPredicate(predicate: (character: number) => boolean): void {
    while (this.program.hasNext) {
      const peek = this.program.peek();
      if (!predicate(peek)) {
        break;
      }
      this.program.advance();
    }
  }

  /**
   * Returns a new token with a @param type and the current substring.
   */
  private createToken(type: Type, content = this.substring()): Token {
    return new Token(this.position - content.length, type, content);
  }

  /**
   * Returns the current substring, advancing the position counter.
   */
  private substring(): string {
    const start = this.position;
    const end = this.program.position;
    this.position = end;
    return this.program.substring(end, start);
  }

  /**
   * Throws a generic error that there was an unrecognized token.
   *
   * @param offset
   * @param length
   */
  private error(offset = this.position, length = 1): never {
    const string = this.program.substring(offset, offset + length);
    console.log({ offset, length, string });
    throw new Error(`Unexpected token: "${string}" at ${offset}.`);
  }
}
