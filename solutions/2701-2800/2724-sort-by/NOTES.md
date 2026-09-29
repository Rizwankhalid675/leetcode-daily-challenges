# 2724. Sort By

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/sort-by/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Return a copy of `arr` sorted ascending by the number `fn(item)`.

## Key constraints
- Up to 5·10^5 elements, and `fn` returns a number (the keys are distinct).

## Approach
Decorate, sort, undecorate. Each element is paired with its key once, the pairs are sorted with a numeric comparator `a[0] - b[0]`, and then the values are unwrapped. This calls `fn` n times instead of about 2·n·log n times inside the comparator. It also leaves the input array untouched.

## Edge cases
- The default `sort()` compares as strings (`100` < `9`), so a numeric comparator is required.
- Negative and fractional keys: subtraction handles them.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
The official examples, a lexicographic-order trap, a call-count and no-mutation check, random sortedness checks, and a 5·10^5 timing run.

## Reusable pattern
**Schwartzian transform (decorate–sort–undecorate)** when the sort key is expensive to compute.
