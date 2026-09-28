# 3876. Construct Uniform Parity Array II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-03 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Math |
| Link | https://leetcode.com/problems/construct-uniform-parity-array-ii/ |
| Result | Accepted, 1019/1019 tests, 5 ms, 72.9 MB (submission 2156486388) |

## What it asks (own words)
Same as Part I (keep each element, or subtract another element from it, then make all elements share a parity),
but a subtraction is only allowed when the result is **at least 1**. In other words, you can only subtract a
*smaller* element.

## Key constraints
- n up to 10⁵, values up to 10⁹, distinct. So we need O(n), and no pairwise checking.

## Reasoning
Parity algebra from Part I still applies. The new rule is that you may only subtract a smaller value.

**Can the target be "all even"?** Odd elements must turn even, and only O − O = E does that. The **smallest odd**
element has no smaller odd to subtract, so it can never become even. "All even" therefore works only when there
are no odd elements at all.

**Can the target be "all odd"?** Odd elements stay. Each even element *e* needs a smaller odd element to subtract
(E − O = O). The hardest even element to satisfy is the **smallest even**. If some odd element is smaller than
it, that same odd element is smaller than every even element. So the condition is simply `minOdd < minEven`.

## Algorithm
One pass computing `minOdd` and `minEven` (initialised to `Infinity`).
Return `minOdd === Infinity || minOdd < minEven`.

## Why it works
The two targets were each reduced to an exact condition: "all even" works iff there are no odd elements, and
"all odd" works iff every even element has a smaller odd element, i.e. `minOdd < minEven`. If there are no even
elements, `minEven = Infinity` and the comparison is true, which is correct because the array is already all odd.

## JavaScript implementation details
- `Infinity` is a clean sentinel for "none seen" and compares correctly against any number.
- `x % 2 === 1` is safe because all values are positive. With negatives you'd need `x % 2 !== 0`.

## Edge cases
- Single element → true.
- All even → true (first clause). All odd → true (`minEven` stays `Infinity`).
- `[2, 3]` → false: 3 can't become even (no smaller odd) and 2 can't become odd (no smaller odd).

## Bugs / debugging
None. It was cross-checked against a brute force of every allowed choice on 1000 random arrays.

## Alternatives considered
- Sorting and scanning: O(n log n), unnecessary since only the two minimums matter.

## Complexity
- Time: O(n).
- Space: O(1).

## Reusable pattern
**"For every x there must exist a smaller y" → compare minimums.** An existence condition over all elements often
reduces to a check on the extreme element (the hardest case), which is a single min/max comparison.

## What to take away personally
One extra constraint ("result ≥ 1") turned an always-true problem into a real one. When a Part II adds a
restriction, ask which element is now hardest to satisfy. That element usually decides the answer.
