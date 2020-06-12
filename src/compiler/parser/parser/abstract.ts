import { Token, Type } from '../../lexer/token';
import { DiagnosticReporter } from '../diagnostic';
import { AstFactory } from '../factory';

/**
 * An error that is thrown during an unrecoverable state in the parser.
 */
export class ParseError extends Error {
  static endOfFile(source?: string): ParseError {
    return new ParseError(`Unexpected EOF${source ? `: ${source}` : ``}`);
  }

  private constructor(message: string) {
    super(message);
  }
}

/**
 * Base parser implementation including only helper functionality.
 */
export abstract class AbstractParser {
  private position = 0;

  constructor(
    protected readonly program: Token[],
    protected readonly reporter: DiagnosticReporter,
    protected readonly factory = new AstFactory(),
  ) {}

  private endOfFile(): never {
    throw ParseError.endOfFile(this.reporter.source.url);
  }

  /**
   * Returns the next token, or throws @see ParseError if there is none.
   *
   * @param offset
   */
  private getNextToken(offset = 0): Token {
    return this.getNextTokenIfDefined(offset) || this.endOfFile();
  }

  /**
   * Returns the next token, or @see undefined if there is none.
   *
   * @param offset
   */
  private getNextTokenIfDefined(offset = 0): Token | undefined {
    return this.program[this.position + offset];
  }

  /**
   * Returns whether at least one more token remains for parsing.
   */
  protected get hasNext(): boolean {
    const token = this.getNextTokenIfDefined();
    if (!token) {
      return false;
    }
    if (token.type === Type.eof) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Returns the token at @member position + @param offset.
   *
   * If this would reach to EOF, will throw @see ParseError.
   *
   * @param offset
   */
  protected peek(offset = 0): Token {
    return this.getNextToken(offset);
  }

  /**
   * Advances and returns the next token.
   *
   * If this would reach to EOF, will throw @see ParseError.
   */
  protected advance(): Token {
    if (!this.hasNext) {
      return this.endOfFile();
    }
    this.position++;
    return this.peek(-1);
  }

  /**
   * Returns the previously scanned token.
   */
  protected previous(): Token {
    return this.peek(-1);
  }

  /**
   * Returns whether the next token is of type @param type.
   */
  protected check(type: Type | [Type, string]): boolean {
    if (!this.hasNext) {
      return false;
    }
    const peek = this.peek();
    if (Array.isArray(type)) {
      return peek.type === type[0] && peek.lexeme === type[1];
    } else {
      return peek.type === type;
    }
  }

  /**
   * Returns whether if any of the following @param types are matched.
   *
   * If true is returned, the position was also advanced by one.
   *
   * @param expect
   */
  protected match(...expect: (Type | [Type, string])[]): boolean {
    return expect.some((e) => {
      if (this.check(e)) {
        this.position++;
        return true;
      } else {
        return false;
      }
    });
  }
}
