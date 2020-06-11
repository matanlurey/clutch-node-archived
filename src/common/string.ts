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

  // Symbols.
  $LPAREN = 40,
  $RPAREN = 41,
  $HYPHEN = 45,
  $PERIOD = 46,
  $LANGLE = 60,
  $RANGLE = 62,
  $LCURLY = 123,
  $RCURLY = 125,

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
