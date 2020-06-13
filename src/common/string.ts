/**
 * Character codes that are referred to during parsing.
 */
export const enum Characters {
  // Numbers.
  $0 = 48,
  $1 = $0 + 1,
  $2 = $1 + 1,
  $3 = $2 + 1,
  $4 = $3 + 1,
  $5 = $4 + 1,
  $6 = $5 + 1,
  $7 = $6 + 1,
  $8 = $7 + 1,
  $9 = $8 + 1,

  // Letters.
  $A = 65,
  $Z = 90,
  $a = 97,
  $z = 122,

  // Symbols.
  $EXCLAIM = 33,
  $PERCENT = 37,
  $AMPERSAND = 38,
  $PIPE = 124,
  $STAR = 42,
  $PLUS = 43,
  $HYPHEN = 45,
  $PERIOD = 46,
  $COLON = 58,
  $COMMA = 44,
  $RSLASH = 47,
  $EQUALS = 61,
  $LPAREN = 40,
  $RPAREN = 41,
  $LANGLE = 60,
  $RANGLE = 62,
  $LCURLY = 123,
  $RCURLY = 125,
  $UNDERSCORE = 95,

  // Misc.
  $TAB = 9,
  $LF = 10,
  $CR = 13,
  $SPACE = 32,
}

/**
 * Returns whether a character is a new-line terminator.
 *
 * @param character
 */
export function isNewLine(character: number): boolean {
  return character === Characters.$LF || character === Characters.$CR;
}

/**
 * Returns whether a character is considered whitespace.
 *
 * @param character
 */
export function isWhiteSpace(character: number): boolean {
  return (
    character === Characters.$SPACE ||
    character === Characters.$TAB ||
    isNewLine(character)
  );
}

/**
 * Returns whether a character is considered a digit.
 *
 * @param character
 */
export function isDigit(character: number): boolean {
  return character >= Characters.$0 && character <= Characters.$9;
}

/**
 * Returns whether @param character is considered a letter.
 */
export function isLetter(character: number): boolean {
  return (
    (character >= Characters.$A && character <= Characters.$Z) ||
    (character >= Characters.$a && character <= Characters.$z)
  );
}

/**
 * Aids incrementally writing a string, including with intendation.
 */
export class StringWriter {
  private indents = '';

  constructor(private buffer = '') {}

  /**
   * Adjusts the current indentation amount.
   *
   * @param amount
   */
  indent(amount = 0): StringWriter {
    if (amount >= 0) {
      this.indents += ' '.repeat(amount);
    } else {
      this.indents = this.indents.substring(-amount);
    }
    return this;
  }

  /**
   * Writes a string or interpolated object to the buffer.
   *
   * @param object
   */
  write(object: unknown): StringWriter {
    this.buffer += `${object}`;
    return this;
  }

  writeIndented(object: unknown): StringWriter {
    return this.write(`${this.indents}${object}`);
  }

  /**
   * Write a string or interpolated object suffixed with a new line.
   *
   * @param object
   */
  writeLine(object: unknown = ''): StringWriter {
    return this.write(`${object}\n`);
  }

  /**
   * Returns the underlying buffer.
   */
  toString(): string {
    return this.buffer;
  }
}
