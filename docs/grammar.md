# Grammar

## Notation

This section informally explains the grammar notation used below.

### Symbols

- _Terminal_ symbol names begin with an uppercase letter, e.g. `Identifier`.
- _Nonterminal_ symbol names begin with a lowercase letter, e.g. `parameter`.
- Each _production_ starts with a colon (`:`).
- Symbol _definitions_ may have productions terminated by a semicolon (`;`).
- Symbol _definitions_ may be prepended with _attributes_, e.g. `start`.

### EBNF

- Operator `|` denotes _alternative_.
- Operator `*` denotes _iteration_ (zero or more).
- Operator `+` denotes _iteration_ (one or more).
- Operator `?` denotes _option_ (zero or one).
- _alpha_ `{` _beta_ `}` denotes a nonempty _beta_-separated list of _alpha_'s.
- Operator `++` means that no space or comment is allowed between operands.

## Syntax

### Literals

#### LiteralBoolean

: ( `"true"` | `"false"` )
;

#### LiteralNumber

TBD
