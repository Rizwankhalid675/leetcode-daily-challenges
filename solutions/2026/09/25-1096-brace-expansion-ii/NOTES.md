# 1096. Brace Expansion II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-25 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | Hash Table, String, Backtracking, Stack, Breadth-First Search, Sorting |
| Link | https://leetcode.com/problems/brace-expansion-ii/ |
| Result | Accepted, 115/115 tests, 6 ms, 60.4 MB (submission 2156490708) |

## What it asks (own words)
A mini-language describes sets of words: a letter is itself; `{A,B,…}` is the union of its parts; writing
expressions next to each other concatenates every word of the first with every word of the second. Expand the
expression and return the distinct words in sorted order.

## Key constraints
- Expression length ≤ 60, so output sizes stay manageable. The challenge is parsing correctly, not performance.

## Reasoning
This is a **grammar with two operators of different precedence**, like arithmetic:
- concatenation (implicit, like `×`) binds tighter;
- comma (union, like `+`) binds looser, and only appears inside braces.

The classic technique is a **recursive-descent parser**, with one function per precedence level:

```
union  := concat (',' concat)*
concat := term term*          (stops at ',' or '}' or end)
term   := letter | '{' union '}'
```

Each function consumes characters from a shared position `i` and returns a `Set` of words. Sets deduplicate for free.

## Algorithm
- `parseUnion`: parse one concat, then while the next char is `,`, skip it and union in another concat.
- `parseConcat`: start with `{''}` (the identity for concatenation); for each term, replace the set with the
  cartesian product `{a + b}`.
- `term`: a letter gives `{letter}`; a `{` means skip, recurse into `parseUnion`, then skip `}`.
- Top level: `parseUnion()`, then spread into an array and sort.

## Why it works
Each grammar rule maps directly to one function, and the stop conditions in `parseConcat` (`,` or `}`) implement
precedence: a comma always ends the current concatenation and hands control back to the union level. Nested braces
recurse naturally.

## JavaScript implementation details
- **Closures over a shared index** `let i = 0` keep the parser compact. Every function advances the same cursor.
- `new Set([''])` as the starting value makes the first product just the term itself.
- `[...set].sort()`: the default sort is lexicographic by UTF-16 code units, which is correct for lowercase words.
  (For numbers you'd need a comparator.)
- `parseUnion` and `parseConcat` are mutually recursive `const` arrow functions. That works because each is only
  *called* after both are defined.

## Edge cases
- Plain letters `"abc"` → one word, via concatenation of three terms.
- Duplicates `{a,a}{a,a}` → `["aa"]`.
- Deep nesting `{{{a}}}`.
- A mix of bare letters and groups: `a{b,c}` inside a union.

## Bugs / debugging
None. It was tested with all grammar examples from the statement plus the edge cases above. There's no simple
independent oracle for this one; the statement's own worked examples served as the specification tests.

## Alternatives considered
- Two stacks (operands and operators), shunting-yard style. It works, but it's harder to get right than a parser
  that mirrors the grammar.
- BFS expanding the first innermost brace group repeatedly: simpler to write, but it can blow up with duplicates
  before deduplication.

## Complexity
- Time: proportional to the total size of the intermediate sets, bounded by the output size times the expression
  length for this grammar.
- Space: the same order, for the sets.

## Reusable pattern
**Recursive descent: one function per precedence level, sharing a cursor.** It handles calculators, JSON-like
formats, template languages, and this problem.

## What to take away personally
When a problem gives you a *grammar*, write the grammar first and then translate each rule into a function. The
code almost writes itself.
