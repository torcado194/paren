paren
=====

a simple nested group parser

`npm i paren`

-----

```js
const parse = require('paren');

parse('a (nested (string (of)) words)');
// ["a ", ["nested ", ["string ", ["of"]], " words"]]

parse('a (nested (string (of)) words)', ' ');
// ["a", ["nested", ["string", ["of"]], "words"]]

parse('one,two,three 3 tres,(a {b,(c)},[{d}]) e,[{(f)}]', ',', ['(', '{', '['], [')', '}', ']']);
// ["one","two","three 3 tres",["a ",["b",["c"]],[["d"]]]," e",[[["f"]]]]

// parse an array by item
let left = Symbol('left'),
    right = Symbol('right');

let a = [left, 1, 2, 3, right, left, left, '(group)', right, right];

parse(a, null, left, right);
// [[[1,2,3]],[[["(group)"]]]]
```