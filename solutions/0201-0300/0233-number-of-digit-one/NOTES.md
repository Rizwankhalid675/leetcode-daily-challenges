# 233. Number of Digit One

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | math, dynamic-programming, recursion |
| Link | https://leetcode.com/problems/number-of-digit-one/ |
| Context | Quest: Maths / Bitmask State Control Center / Bitmasking for Sets/states |

## What it asks (own words)
Across all integers from 0 to n, how many digit 1s are written in total?

## Approach
Count each decimal position m = 1, 10, 100, ... separately. Split n into high (digits above m), cur (the digit at m) and low (digits below m).
- For each of the **high** complete cycles of the higher digits, the position shows 1 for m numbers: high·m.
- In the incomplete top cycle: if cur > 1 all m of those numbers appear (+m); if cur = 1 only low + 1 of them (+low+1); if cur = 0 none.

## Why it works
At position m the digit cycles through 0..9, each held for m consecutive numbers. The formula counts full cycles, then the partial one.

## Edge cases
- n = 0 gives 0 (the loop does not run).
- m reaches 10¹⁰ at most, far below 2^53.

## Complexity
- Time: O(log₁₀ n)
- Space: O(1)

## Testing note
Compared with a running count of '1' characters for every n ≤ 30000; large values checked against the closed form (10^k − 1 has k·10^(k−1) ones).

## Reusable pattern
**Per-position digit counting (high / cur / low)**: the template for "how many times does digit d appear in 1..n".
