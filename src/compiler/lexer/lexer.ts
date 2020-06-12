import { Scanner } from '../../common/scanner';
import {
  Characters,
  isDigit,
  isLetter,
  isWhiteSpace,
} from '../../common/string';
import {
  $Add,
  $Arrow,
  $Assign,
  $Boolean,
  $CloseCurly,
  $CloseParen,
  $Colon,
  $Divide,
  $Dot,
  $EOF,
  $Equals,
  $Func,
  $Identifier,
  $Let,
  $Modulus,
  $Multiply,
  $Not,
  $NotEquals,
  $Number,
  $OpenCurly,
  $OpenParen,
  $Subtract,
  Keyword,
  Token,
  Type,
} from './token';

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

  constructor(
    private readonly keywords: { [key: string]: Keyword | undefined } = {
      func: $Func,
      let: $Let,
    },
  ) {}

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
      case Characters.$COLON:
        return this.createToken($Colon);
      case Characters.$LPAREN: // (
        return this.createToken($OpenParen);
      case Characters.$RPAREN: // )
        return this.createToken($CloseParen);
      case Characters.$LCURLY: // {
        return this.createToken($OpenCurly);
      case Characters.$RCURLY: // }
        return this.createToken($CloseCurly);
      case Characters.$PERIOD: // .
        return this.createToken($Dot);
      case Characters.$PLUS: // +
        return this.createToken($Add);
      case Characters.$HYPHEN: // - or ->
        return this.createToken(
          this.program.match(Characters.$RANGLE) ? $Arrow : $Subtract,
        );
      case Characters.$STAR: // *
        return this.createToken($Multiply);
      case Characters.$RSLASH: // /
        return this.createToken($Divide);
      case Characters.$PERCENT: // %
        return this.createToken($Modulus);
      case Characters.$EQUALS: // = or ==
        return this.createToken(
          this.program.match(Characters.$EQUALS) ? $Equals : $Assign,
        );
      case Characters.$EXCLAIM: // ! or !=
        return this.createToken(
          this.program.match(Characters.$EQUALS) ? $NotEquals : $Not,
        );
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
        return this.createToken($Boolean, identifierOrKeyword);
      default:
        const keyword = this.keywords[identifierOrKeyword];
        return keyword
          ? this.createToken(keyword, identifierOrKeyword)
          : this.createToken($Identifier, identifierOrKeyword);
    }
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
    throw new Error(`Unexpected token: \`${string}\` at ${offset}.`);
  }
}
