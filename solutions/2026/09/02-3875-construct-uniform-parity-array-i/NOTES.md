# 3875. Construct Uniform Parity Array I

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-02 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Array, Math |
| Link | https://leetcode.com/problems/construct-uniform-parity-array-i/ |
| Result | Accepted, 999/999 tests, 0 ms, 54.6 MB (submission 2156486338) |

## What it asks (own words)
For each element you may either keep it or replace it with itself minus some *other* element. Can you make every
element the same parity (all even or all odd)?

## Key constraints
- n ≤ 100, values 1..100, all distinct. Tiny, but the answer turns out not to depend on the size at all.

## Reasoning
Only parity matters, so think in terms of even (E) and odd (O):
- E − O = O, O − O = E, E − E = E, O − E = O.
- If all elements already share a parity: keep everything. Done.
- Otherwise there is at least one odd element *o*. Target "all odd": odd elements stay, and every even element *e*
  becomes *e − o*, which is odd. Since *e ≠ o*, the "other index" rule is satisfied.

So every input can be made uniform, and the answer is always `true`.

## Algorithm
Return `true`.

## Why it works
The case split above covers every input: either the array is already uniform, or it contains an odd element that
every even element can subtract. Negative results are allowed in this version, so nothing blocks the subtraction.

## JavaScript implementation details
- The parameter is unused. That's fine and intentional; the proof is the solution.
- The tests back up the proof with a **brute force** that tries every allowed choice on random small arrays. When
  a solution is "suspiciously simple", a brute-force cross-check is cheap insurance.
- In the brute force, `Math.abs(v % 2)` is needed because in JS `-3 % 2 === -1`, not `1`. The remainder takes
  the sign of the dividend.

## Edge cases
- n = 1: trivially uniform.
- All even / all odd: keep all.

## Bugs / debugging
None. The brute-force check agreed on 500 random arrays before submitting.

## Alternatives considered
- Simulating choices or counting parities. Unnecessary once the parity algebra is written down.

## Complexity
- Time: O(1).
- Space: O(1).

## Reusable pattern
**Reduce to parity (or another invariant) and write the small algebra table.** Many "can you make X" problems
collapse once you only track the property that matters.

## What to take away personally
Write down the four parity cases before coding anything. Also remember the JS `%` sign rule for negative numbers.
Compare this with Part II (3876), where one extra constraint changes the answer completely.
