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

### Common Elements

#### `decimalDigit`

```txt
: [ 0-9 ]
;
```

#### `decimalDigits`

```txt
: digit+
;
```

#### `identifierStart`

```txt
: [ A-Z ]
| [ a-z ]
;
```

#### `typeDefinition`

```txt
: identifier"?"?
;
```

#### `argumentList`

```txt
: "("
  argument { "," }
  ")"
;
```

#### `argument`

```txt
: identifier (":" typeDefinition)? ("=" expression)?
;
```

## Syntax

### Entrypoint

#### `compilationUnit`

```txt
: topLevelDeclaration*
;
```

### Declarations

#### `topLevelDeclaration`

```txt
: functionDeclaration
| variableDeclaration
;
```

#### `functionDeclaration`

```txt
: "func"
  identifier
  argumentList?
  "->"
  typeDefinition
  "{" statement+ "}"
;
```

#### `variableDeclaration`

```txt
: "let"
  identifier
  (":" typeDefinition)?
  ("=" expression)?
```

### Expressions

> TODO: Add precedence table once relevant.

#### `Identifier`

```txt
: identifierStart ( identifierStart | decimalDigits | _ )*
```

##### `LiteralBoolean`

```txt
: ( `"true"` | `"false"` )
;
```

##### `LiteralNumber`

```txt
: decimalDigits
| decimalDigits . decimalDigits
;
```
