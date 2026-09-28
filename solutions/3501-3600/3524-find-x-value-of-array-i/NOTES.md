# 3524. Find X Value of Array I

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-21 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Math, Dynamic Programming |
| Link | https://leetcode.com/problems/find-x-value-of-array-i/ |
| Result | Accepted, 782/782 tests, 48 ms, 73.5 MB (submission 2156490267) |

## What it asks (own words)
Chop off any prefix and any suffix (possibly empty) as long as something remains. The remainder is a non-empty
subarray. For each residue x in 0..k−1, count how many subarrays have a product ≡ x (mod k).

## Key constraints
- n ≤ 10⁵ → O(n²) subarrays (5·10⁹) is too many to enumerate.
- **k ≤ 5**, so residues are a tiny state.
- Values up to 10⁹: take `% k` first, so products stay tiny.

## Reasoning
Products mod k are *composable*: `(a · b) mod k = ((a mod k) · (b mod k)) mod k`. So, for subarrays **ending at
index j**, we only need a histogram of their residues. Moving to j+1 with value v:
- every subarray ending at j extends to j+1: residue r → r·v mod k;
- plus the new single-element subarray [v] with residue v mod k.

Add each index's histogram into the global answer.

## Algorithm
`endingHere = [0]*k`, `result = [0]*k`. For each v: `next[(r·v) % k] += endingHere[r]` for all r; `next[v % k] += 1`;
add `next` into `result`; `endingHere = next`.

## Why it works
Every non-empty subarray has a unique right end, so it's counted exactly once, in that index's histogram. The
transition is exact by the modular product rule.

## JavaScript implementation details
- Reduce each value `% k` before multiplying: `r · v < 25`. That's exact, with no overflow concerns.
- The counts can reach n(n+1)/2 ≈ 5·10⁹. That exceeds 32-bit ints but is far below 2⁵³, so plain JS numbers are
  exact. A test checks this at n = 10⁵. (In Java/C++ this would need a `long`.)
- k = 1: everything is residue 0; `value % 1 === 0` handles it naturally.

## Edge cases
- k = 1 → `[n(n+1)/2]`.
- Values that are multiples of k make every subarray containing them residue 0.

## Bugs / debugging
None. It was checked against the O(n²) brute force on 500 random arrays with values up to 10⁹.

## Alternatives considered
- Prefix products with modular inverses. This doesn't work in general: mod k isn't prime and zero residues have no
  inverse.

## Complexity
- Time: O(n·k).
- Space: O(k).

## Reusable pattern
**"Count subarrays by some composable property" → DP over subarrays ending at i, keyed by the property's (small)
state.** The same shape works for subarray XOR, sum mod k, bitwise-AND values, etc.

## What to take away personally
When the modulus or state space is tiny, keep a histogram per position instead of enumerating subarrays. Part II
(3525) makes this updatable with a segment tree.
