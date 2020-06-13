import { SourceFile } from '../../common/source';
import { Token } from '../lexer/token';
import { AstNode } from './ast/ast';

/**
 * Represents a static diagnostic reported during parsing or analysis.
 */
export class Diagnostic {
  constructor(
    readonly source: SourceFile,
    readonly offset: number,
    readonly length: number,
    readonly code: DiagnosticCode,
  ) {}

  toString(): string {
    const span = this.source.span(this.offset, this.length - this.offset);
    return `[${this.code.category.toUpperCase()}] ${span}: (${this.code.name})`;
  }
}

/**
 * Wraps and throws a @see Diagnostic as @see Error.
 */
export class DiagnosticError extends Error {
  constructor(readonly diagnostic: Diagnostic) {
    super(`${diagnostic}`);
  }
}

/**
 * Category of static diagnostic.
 *
 * Some are fatal, others may be ignored.
 */
export enum DiagnosticCategory {
  /**
   * **Fatal** conditions in either _parsing_ or _resolving_ source inputs,
   * that prohibit compilation. An error is considered a _violation_ of the
   * language, invalid, or unsupported syntax, or other factors that make
   * compilation impossible.
   *
   * Adding (or removing) _errors_ is considered a **breaking change**.
   *
   * Some examples:
   *
   * - Syntax errors, e.g. invalid or misplaced characters or tokens.
   * - Static errors, e.g. undefined, or twice-defined elements.
   * - Type errors, e.g. a violation of the type system, inheritence.
   * - Semantic errors, e.g. would statically violate semantics of the language.
   */
  error = 'error',

  /**
   * **Non-fatal** conditions that most commonly occur in _resolving_ source
   * inputs that do _not_ prohibit compilation but may indicate either undefined
   * or undesired behavior, such as a guaranteed runtime error. Most production
   * programs will want and and may consider warnings fatal.
   *
   * Adding (or removing) _warnings_ is **not** a breaking change, as it will
   * not effect existing published libraries or production apps, though they
   * will need to be resolved to publish a non-patch release, and should only
   * be added without bumping the major version when they add high value.
   *
   * The goal of all warnings should be to eventually promoted to an @see Error
   * otherwise the @see Hint category may be a better fit as an indication
   * that code is _likely_ incorrect.
   *
   * Some examples:
   *
   * - _New_ syntax, static, type, or semantic issues that allow compilation.
   * - API usage that will be removed or modified in the immediate future.
   */
  warning = 'warning',

  /**
   * **Non-fatal** conditions that normally occur in _resolving_ source inputs
   * that do _not_ prohibit compilation but usually indicate undesired behavior,
   * unused or unneeded code, potentially with a **very** small chance of false
   * positives.
   *
   * Some examples:
   *
   * - An _unused_ local member or private or module-private element.
   * - Local or module-local unused code or unnecessary branch analysis.
   * - API usage that will be removed or modified in the near future.
   * - Frameworks or libraries custom highlighting code they find problematic.
   */
  hint = 'hint',

  /**
   * **Non-fatal** conditions that are _suggestions_ for code health, stylistic
   * issues, that are meant to guide and assist code reviews and consistency to
   * use _idiomatic_ language syntax, and semantics, potentially with a small
   * chance of false positives.
   *
   * Adding (or removing) tips are **not** a breaking cange, and will not affect
   * existing or developing libraries or apps. It is a recommended workflow
   * option to _only_ show tips on _new_ or _modified_ lines of code - a sort of
   * "hey, you might have meant X" or "did you consider Y?".
   *
   * Some examples:
   *
   * - Not using idiomatic language or libraries.
   * - Not using suggested formatting.
   * - An "FYI".
   */
  tip = 'tip',
}

/**
 * Represents known diagnostics.
 */
export class DiagnosticCode {
  static readonly SYNTAX_END_OF_FILE = new DiagnosticCode(
    'SYNTAX_END_OF_FILE',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_EXPECTED_IDENTIFIER = new DiagnosticCode(
    'SYNTAX_EXPECTED_IDENTIFIER',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_INVALID_OPERATOR = new DiagnosticCode(
    'SYNTAX_INVALID_OPERATOR',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_UNEXPECTED_TOKEN = new DiagnosticCode(
    'SYNTAX_UNEXPECTED_TOKEN',
    DiagnosticCategory.error,
  );

  static readonly SYNATX_EXPECTED_COMMA = new DiagnosticCode(
    'SYNATX_EXPECTED_COMMA',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_EXPECTED_ELSE = new DiagnosticCode(
    'SYNTAX_EXPECTED_ELSE',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_EXPECTED_PARENTHESES = new DiagnosticCode(
    'SYNTAX_EXPECTED_PARENTHESES',
    DiagnosticCategory.error,
  );

  static readonly SYNTAX_EXPECTED_THEN = new DiagnosticCode(
    'SYNTAX_EXPECTED_THEN',
    DiagnosticCategory.error,
  );

  private constructor(
    readonly name: string,
    readonly category: DiagnosticCategory,
  ) {}
}

/**
 * Aids in reporting diagnostics.
 */
export class DiagnosticReporter {
  private static throwDiagnostics(message: Diagnostic): void {
    throw new DiagnosticError(message);
  }

  /**
   * Creates a new diagnostic reporter.
   *
   * @param source File being analyzed.
   * @param listener How to handle diagnostics; by default throws an error.
   */
  constructor(
    public readonly source: SourceFile,
    private readonly listener = DiagnosticReporter.throwDiagnostics,
  ) {}

  /**
   * Report an AST node.
   *
   * @param node
   * @param code
   */
  reportNode(node: AstNode, code: DiagnosticCode): void {
    const start = node.firstToken.offset;
    const end = node.firstToken.offset;
    return this.reportOffset(start, end - start, code);
  }

  /**
   * Report a specific token.
   *
   * @param token
   * @param code
   */
  reportToken(token: Token, code: DiagnosticCode): void {
    return this.reportOffset(token.offset, token.length, code);
  }

  /**
   * Report a specific offset and length.
   *
   * @param offset
   * @param length
   * @param code
   */
  reportOffset(offset: number, length: number, code: DiagnosticCode): void {
    return this.listener(new Diagnostic(this.source, offset, length, code));
  }
}
