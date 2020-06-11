# Clutch

![Clutch Logo](https://user-images.githubusercontent.com/168174/45592313-6d608680-b91e-11e8-8edd-f12ee6e74824.png)

_Clutch_ is an expression-oriented and object-oriented modern programming
language that compiles to terse, efficient, and modern JavaScript:

```js
// fib(n) -> if n < 2 then n else fib(n - 1) + fib(n- 2)
function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
```

_Clutch_'s goals:

- Make functional programming a delight but keep aproachable to traditional use.
- Defaults that prefer immutability and optimizations.
- Low overhead compilation and interpoability to and with JavaScript.

## TODO

### Lexer

- [ ] Scan hyphens prefixing numbers.
- [ ] Scan hex and E-prefixed numbers.
- [ ] Scan identifiers or keywords, including `true` or `false`.
