# Inspiration

The goal of _Clutch_ is to produce small, optimized web apps. One of the initial
inspirations was trying to compete in the JS13K Hackathon, and despite using as
many minifiers as possible (including some that supported unused code removal)
it just was not possible to procuce a game if we wanted to use any libraries.

_Clutch_ is closely tied to and compiles to JavaScript. One of the goals is to
allow seamless use _of_ existing JavaScript (for compatibility as well as to
leverage the ecoystem of pacakges), but does _not_ produce JavaScript that is
meant to be consumed by other JavaScript packages or apps.

## Types

Clutch has very few built-in types:

```txt
// Bottom type. Sometimes called "Never" in other languages.
external type Nothing {}

// Top type. Sometimes called "Object" in other languages.
external type Something {}
```

The rest of the types are defined by SDK, which currently is JavaScript:

```txt
external type Boolean {
  ...
}

external type String {
  ...
}

external type Number {
  // Declares Numbers can be added to other numbers, returning a Number.
  operator +(other: Number): Number
}
```

Clutch has optional but semantically significant static types. What that means
is that Clutch can interact with untyped APIs, but doing so must be explicit -
it is not possible to _accidentally_ duck-type something:

```txt
a(b: Number) -> {
  // Compile-time error.
  print(b.doesNotExist)
}
```

## Examples

### Defining a variable

```txt
// A one-time, non-null, String (inferred) assigned the value 'Clutch'.
let name = 'Clutch'

// An unassigned, initially null, Number.
let age: Number?
```
