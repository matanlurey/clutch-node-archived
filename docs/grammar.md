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

### Elements

#### decimalDigit

```txt
: [ 0-9 ]
;
```

#### decimalDigits

```txt
: digit+
;
```

### identifierStart

```txt
: [ A-Z ]
| [ a-z ]
;
```

## Syntax

### Expressions

| Precedence | Title                 | Symbols            |
| ---------- | --------------------- | ------------------ |
| _Highest_  |                       |                    |
|            | _Literals_            |                    |
|            | Number                |                    |
|            | String                |                    |
|            | Boolean               |                    |
|            | Identifier            |                    |
| 14         | Grouping              | `( … )`            |
| 13         | Member Access         | `… . …`            |
| 12         | Function Call         | `… ( …* )`         |
| 11         | _Postfix_             |                    |
|            | Postfix Increment     | `… ++`             |
|            | Postfix Decrement     | `… --`             |
| 10         | _Prefix_              |                    |
|            | Logical Not           | `! …`              |
|            | Bitwise Not           | `~ …`              |
|            | Unary Positive        | `+ …`              |
|            | Unary Negative        | `- …`              |
|            | Prefix Increment      | `++ …`             |
|            | Prefix Decrement      | `-- …`             |
| 9          | _Multiplicative_      |                    |
|            | Mulitplication        | `… * …`            |
|            | Division              | `… / …`            |
|            | Remainder             | `… % …`            |
| 8          | _Additive_            |                    |
|            | Addition              | `… + …`            |
|            | Subtraction           | `… - …`            |
| 7          | _Bitwise Shift_       |                    |
|            | Bitwise Left Shift    | `… << …`           |
|            | Bitwise Right Shift   | `… >> …`           |
| 6          | _Comparison_          |                    |
|            | Less Than             | `… < …`            |
|            | Less Than Or Equal    | `… <= …`           |
|            | Greater Than          | `… > …`            |
|            | Greater Than Or Equal | `… >= …`           |
| 5          | _Equality_            |                    |
|            | Equality              | `… == …`           |
|            | Inequality            | `… != …`           |
|            | Identity              | `… === …`          |
|            | Unidentity            | `… !== …`          |
| 4          | Logical And           | `… && …`           |
| 3          | Logical Or            | `… &#124;&#124; …` |
| 2          | Conditional           | `if … then …`      |
| 1          | _Assignment_          |                    |
|            | Assign                | `… = …`            |
|            | Assign Increased By   | `… += …`           |
|            | Assign Decreased By   | `… -= …`           |
|            | Assign Multiplied By  | `… *= …`           |
|            | Assign Divided By     | `… /= …`           |
|            | Assign Remainder By   | `… %= …`           |

### Identifier

```txt
: identifierStart ( identifierStart | decimalDigits | _ )*
```

### Literals

#### LiteralBoolean

```txt
: ( `"true"` | `"false"` )
;
```

#### LiteralNumber

```txt
: decimalDigits
| decimalDigits . decimalDigits
;
```
