# 2623. Memoize

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/memoize/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Wrap a pure function so repeated calls with the same inputs reuse the earlier result instead of calling it again. The judge counts the real calls.

## Key constraints
- The functions are `sum(a, b)`, `fib(n)` and `factorial(n)`, all with integer arguments.
- Up to 10^5 actions.

## Approach
A `Map` from a string key to the result. The key is the argument count plus the comma-joined arguments. Integers can't contain commas, so different argument lists always give different keys. `cache.has` (not a truthiness check) makes a cached `0` or `undefined` count as a hit.

## Edge cases
- `(1, 2)` and `(2, 1)` are different inputs, so they get different keys.
- `(12, 3)` and `(1, 23)`: the separator keeps them apart.

## Complexity
- Time: O(k) per call to build the key (k = number of arguments, at most 2)
- Space: O(distinct inputs)

## Testing note
All three official scenarios with a call-counting wrapper, collision and order checks, and 10^5 random calls where the real call count must equal the number of distinct inputs.

## Reusable pattern
**Memoize = Map + key serialization.** Arbitrary object arguments would need a nested-Map trie keyed by identity instead.
