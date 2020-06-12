import { SourceFile } from './source';

/**
 * A simple, low-level scanner for incrementally reading streaming text.
 */
export class Scanner {
  // File or content currently being read.
  private readonly input: SourceFile;

  // Current position in the scanner.
  private mPosition = 0;

  constructor(input: string | SourceFile, url?: string) {
    if (typeof input === 'string') {
      this.input = new SourceFile(input, url);
    } else {
      this.input = input;
    }
  }

  /**
   * A reference to the content data.
   */
  private get contents(): string {
    return this.input.contents;
  }

  /**
   * Length of the input in the scanner.
   */
  get length(): number {
    return this.input.length;
  }

  /**
   * Current position in the scanner.
   */
  get position(): number {
    return this.mPosition;
  }

  /**
   * Returns a substring of the underlying data of start -> end.
   *
   * @param end
   * @param start
   */
  substring(start = this.mPosition, end = this.length - start): string {
    return this.contents.substring(start, end);
  }

  /**
   * Returns whether additional characters have yet to be scanned.
   */
  get hasNext(): boolean {
    return this.mPosition < this.length;
  }

  /**
   * Returns whether pattern is the next character, substring, or function.
   *
   * @param pattern
   */
  match(pattern: number | string | ((char: number) => boolean)): boolean {
    if (typeof pattern === 'string') {
      if (this.contents.startsWith(pattern, this.mPosition)) {
        this.mPosition += pattern.length;
        return true;
      } else {
        return false;
      }
    }
    const next = this.peek();
    if (typeof pattern == 'number' ? next === pattern : pattern(next)) {
      this.mPosition++;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the next character and advances the position counter.
   */
  advance(): number {
    return this.contents.charCodeAt(this.mPosition++);
  }

  /**
   * Returns the next character.
   */
  peek(offset = 0): number {
    return this.contents.charCodeAt(this.mPosition + offset);
  }
}
