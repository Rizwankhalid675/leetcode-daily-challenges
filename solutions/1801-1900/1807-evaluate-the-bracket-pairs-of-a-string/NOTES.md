# 1807. Evaluate the Bracket Pairs of a String

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-26 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Hash Table, String |
| Link | https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/ |
| Result | Accepted, 105/105 tests, 59 ms, 94.9 MB (submission 2156490947) |

## What it asks (own words)
A template string contains `(key)` placeholders (never nested). Replace each with its value from a dictionary, or
with `?` if the key is unknown.

## Key constraints
- |s| ≤ 10⁵ and up to 10⁵ dictionary entries → a hash map for lookups, and linear-time output building.

## Reasoning
Two classic performance traps:
1. Searching the knowledge list for each key would be O(n·m). A `Map` makes it O(1).
2. Building the result with repeated `+=` on a string. Modern engines optimize this reasonably well, but collecting
   pieces in an array and calling `join` once is the reliably linear approach.

## Algorithm
`values = new Map(knowledge)`. Scan s: copy normal characters; at `(`, find the matching `)` with `indexOf`,
look up the key, push the value or `?`, and jump the index to the `)`.

## Why it works
No nesting means the next `)` after a `(` always closes it. Each character is visited a constant number of times.

## JavaScript implementation details
- `new Map(knowledge)` works directly because `knowledge` is already an array of `[key, value]` pairs, the exact
  shape the Map constructor accepts.
- `values.get(key) ?? '?'` uses **nullish coalescing**, which falls back only on `undefined`/`null`. `||` would
  also replace an empty-string value; the values here are non-empty, but `??` states the intent precisely.
- `s.indexOf(')', i)` searches from position i, and setting `i = close` lets the loop's `i++` step past it.

## Edge cases
- No brackets or empty knowledge.
- Keys match exactly: `(ab)` does not match key `a`.
- Values aren't re-evaluated even if they look like keys.

## Bugs / debugging
None.

## Alternatives considered
- `s.replace(/\((\w+)\)/g, (_, k) => values.get(k) ?? '?')`: a one-liner with a regex and a replacer function.
  It's idiomatic JS and also linear, but the manual scan shows the mechanics.

## Complexity
- Time: O(|s| + total size of knowledge).
- Space: O(|s| + |knowledge|).

## Reusable pattern
**Tokenize-and-substitute with a hash map.** It's the core of every template engine. Use a Map for lookups and an
array + `join` for output.

## What to take away personally
Learn `??` versus `||`, and remember that `new Map(arrayOfPairs)` exists.
