import { Scanner } from '../../common/scanner';
import {
  Characters,
  isDigit,
  isLetter,
  isWhiteSpace,
} from '../../common/string';
import { Token, Type } from './token';

function isIdentifierStart(character: number): boolean {
  return isLetter(character) || character === Characters.$UNDERSCORE;
}

function isIdentifier(character: number): boolean {
  return isIdentifierStart(character) || isDigit(character);
}

/**
 * Tokenizees and returns a program as a series of tokens.
 */
export class Lexer {
  private position!: number;
  private program!: Scanner;

  constructor(private readonly keywords = new Set(['func', 'let'])) {}

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
    scanned.push(this.createToken(Type.eof, ''));
    return scanned;
  }

  private scanToken(): Token | undefined {
    const character = this.program.advance();
    switch (character) {
      // PAIRS OF CHARACTERS ======
      // (, ), {, }, <, >
      case Characters.$LPAREN:
      case Characters.$RPAREN:
      case Characters.$LCURLY:
      case Characters.$RCURLY:
      case Characters.$LANGLE:
      case Characters.$RANGLE:
        return this.createToken(Type.pair);
      // SYMBOLS (NOT OPERATORS) ==
      // :, .
      case Characters.$COLON:
      case Characters.$PERIOD:
        return this.createToken(Type.symbol);
      // OPERATORS ================
      // +, *, /, %
      case Characters.$PLUS: /// +
      case Characters.$STAR: /// *
      case Characters.$RSLASH:
      case Characters.$PERCENT: // %
        return this.createToken(Type.operator);
      // OPERATORS or SYMBOLS =====
      // =, ==, !=, !, -, ->
      case Characters.$EQUALS: // = or ==
        this.program.match(Characters.$EQUALS);
        return this.createToken(Type.operator);
      case Characters.$EXCLAIM: // ! or !=
        this.program.match(Characters.$EQUALS);
        return this.createToken(Type.operator);
      case Characters.$HYPHEN: // - or ->
        if (this.program.match(Characters.$RANGLE)) {
          return this.createToken(Type.symbol);
        } else {
          return this.createToken(Type.operator);
        }
      default:
        if (isWhiteSpace(character)) {
          this.position = this.program.position;
          break;
        }
        if (isDigit(character)) {
          return this.scanNumber();
        }
        if (isIdentifierStart(character)) {
          return this.scanIdentifierOrKeyword();
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
   * Scans any tokens that are valid identifiers.
   */
  private scanIdentifierOrKeyword(): Token {
    this.scanPredicate(isIdentifier);
    const identifierOrKeyword = this.substring();
    switch (identifierOrKeyword) {
      case 'true':
      case 'false':
        return this.createToken(Type.literal, identifierOrKeyword);
      default:
        return this.keywords.has(identifierOrKeyword)
          ? this.createToken(Type.keyword, identifierOrKeyword)
          : this.createToken(Type.identifier, identifierOrKeyword);
    }
  }

  /**
   * Scans any tokens that are valid digits, returning a number.
   */
  private scanDigits(): Token {
    this.scanPredicate(isDigit);
    return this.createToken(Type.literal);
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
    throw new Error(`Unexpected token: \`${string}\` at ${offset}.`);
  }
}
