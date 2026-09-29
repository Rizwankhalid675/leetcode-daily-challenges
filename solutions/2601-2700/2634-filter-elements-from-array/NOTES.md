# 2634. Filter Elements from Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/filter-elements-from-array/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Reimplement `filter`: keep the elements for which the callback (given value and index) returns a **truthy** value, without using the built-in.

## Approach
One pass, pushing kept elements onto a fresh array.

## Edge cases
- The callback may return numbers rather than booleans (example 3 returns `n + 1`), so test truthiness, not `=== true`.
- Nothing kept gives an empty array.

## Complexity
- Time: O(n)
- Space: O(n) worst case for the output

## Testing note
The official examples, random comparison against the real `filter` with a callback returning non-boolean values, and a guard that breaks the built-in during the call.

## Reusable pattern
**Truthiness, not booleans**: JS predicates often return arbitrary values.
