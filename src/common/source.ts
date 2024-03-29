import { binarySearch } from './array';
import { assertMax, assertMin } from './assert';
import { Characters } from './string';

/**
 * Represents a fragment of text, often within a larger context or file.
 *
 * Some implementations may lazily compute properties.
 */
export class StringSpan {
  /**
   * Create a new span of text.
   *
   * @param text Literal text being referred to.
   * @param offset Offset as represented in the entire body of text.
   * @param column Column within the body of text.
   * @param line Line within the body of text.
   */
  constructor(
    readonly text: string,
    readonly offset = 0,
    readonly column = 0,
    readonly line = 0,
  ) {
    assertMin('offset', offset);
    assertMin('column', column);
    assertMin('line', line);
  }

  get length(): number {
    return this.text.length;
  }

  toString(): string {
    return `${this.line}:${this.column}:${this.text}`;
  }
}

/**
 * A @see SourceSpan derived from a @see SourceFile.
 *
 * Both @member line and @member column are lazily computed.
 */
export class FileSpan implements StringSpan {
  private mLineAndColumn?: [number, number];

  constructor(
    readonly file: SourceFile,
    readonly offset: number,
    readonly text: string,
  ) {}

  private computeLineAndColumn(): [number, number] {
    const cache = this.mLineAndColumn;
    return (
      cache ||
      (this.mLineAndColumn = this.file.computeLineAndColumn(this.offset))
    );
  }

  get length(): number {
    return this.text.length;
  }

  get line(): number {
    return this.computeLineAndColumn()[0];
  }

  get column(): number {
    return this.computeLineAndColumn()[1];
  }

  toString(): string {
    return `${this.file.url || '<Unknown>'}:${this.line}:${this.column} "${
      this.text
    }"`;
  }
}

/**
 * Represents a fragment of text from a file but now in memory.
 */
export class SourceFile {
  /**
   * Create new fragment of text, often loaedd from a file.
   * @param contents Contents of the file.
   * @param url URL of the file, if any.
   */
  constructor(readonly contents: string, readonly url?: string) {}

  private assertValidOffset(offset: number): void {
    assertMin('offset', offset);
    assertMax('length', offset, this.length);
  }

  /**
   * Length of @see contents as a convenience.
   */
  get length(): number {
    return this.contents.length;
  }

  /**
   * Computes an array of offsets for each line start in the file.
   *
   * Each offset refers to the first character *after* the newline. If the
   * source file has a trailing newline, the final offset won't actually be in
   * the file.
   */
  private computeLineStarts(): number[] {
    const { length, contents } = this;
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      let c = contents.charCodeAt(i);
      if (c === Characters.$CR) {
        const j = i + 1;
        if (j >= length || contents.charCodeAt(j) === Characters.$LF) {
          c = Characters.$LF;
        }
      }
      if (c === Characters.$LF) {
        result.push(i + 1);
      }
    }
    return result;
  }

  /**
   * Returns the line and column given the offset.
   *
   * @param offset
   */
  computeLineAndColumn(offset: number): [number, number] {
    this.assertValidOffset(offset);
    const lineStarts = this.computeLineStarts();
    if (offset < lineStarts[0]) {
      return [0, offset];
    }
    const line = binarySearch(lineStarts, offset);
    const start = lineStarts[line] || 0;
    return [line + 1, Math.abs(start - offset)];
  }

  /**
   * Returns a span representing start -> end in the file.
   *
   * @param start
   * @param end
   */
  span(start: number, end: number): FileSpan {
    this.assertValidOffset(start);
    this.assertValidOffset(end);
    assertMax('start', start, end);
    return new FileSpan(this, start, this.contents.substring(start, end));
  }
}
