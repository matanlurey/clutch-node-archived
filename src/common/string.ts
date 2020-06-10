/**
 * Character codes that are referred to during parsing.
 */
export const enum Characters {
  // Symbols.

  /**
   * `(`
   */
  $LPAREN = 40,

  /**
   * `)`
   */
  $RPAREN = 41,

  /**
   * `-`
   */
  $HYPHEN = 45,

  /**
   * `<`
   */
  $LANGLE = 60,

  /**
   * `>`
   */
  $RANGLE = 62,

  /**
   * `{`
   */
  $LCURLY = 123,

  /**
   * `}`
   */
  $RCURLY = 125,

  // Misc.

  /**
   * `\t`
   */
  $TAB = 9,

  /**
   * `\n`
   */
  $LF = 10,

  /**
   * `\r`
   */
  $CR = 13,

  /**
   * ` `
   */
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
