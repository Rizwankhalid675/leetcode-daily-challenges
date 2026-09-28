# 835. Image Overlap

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-13 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Matrix |
| Link | https://leetcode.com/problems/image-overlap/ |
| Result | Accepted, 60/60 tests, 36 ms, 61.8 MB (submission 2156488898) |

## What it asks (own words)
Two n×n black-and-white images. Slide one over the other (no rotation; pixels pushed off the edge disappear) and
count positions where both are 1. What's the best possible count?

## Key constraints
- n ≤ 30 → 900 cells per image.
- Shifts range from −(n−1) to n−1 on each axis → (2n−1)² ≈ 3,481 possible translations.

## Reasoning
The brute force tries every translation and counts overlaps: O(n⁴) ≈ 3.1M cell checks at n = 30. That's actually
fine, but there's a neater way to look at it:

**Voting.** Pair every 1-cell *a* in img1 with every 1-cell *b* in img2. That pair lines up under exactly one
translation, `b − a`. The overlap for a translation is the number of pairs voting for it. So count votes and take
the maximum. Only 1-cells participate, so sparse images are very fast.

## Algorithm
1. Collect coordinates of 1-cells in each image.
2. For each pair, compute `(dr, dc) = (r2 − r1, c2 − c1)`, map it to a flat index with an offset of `n − 1`, and
   increment its vote counter, tracking the maximum.
3. Return the maximum (0 if there are no 1-cells).

## Why it works
Under a fixed translation T, a 1 in the shifted img1 at position a+T overlaps a 1 in img2 exactly when some b = a+T
is a 1-cell. Each overlapping pair (a, b) is counted once, for T = b − a, so votes[T] equals the overlap for T.
Pixels leaving the grid never form a pair, because b always lies inside img2.

## JavaScript implementation details
- The 2-D shift is encoded as `(dr + n − 1) * (2n − 1) + (dc + n − 1)` into an `Int32Array`. This is faster and
  simpler than a `Map` keyed by a string like `"dr,dc"`.
- `if (++votes[key] > best)` updates the maximum in the same step as incrementing.

## Edge cases
- No 1s in either image → 0.
- The maximal shift (a corner pixel matched to the opposite corner) is covered by the offset range.
- Full 30×30 images → 900 (zero shift), the worst case for the pair loop (810,000 pairs).

## Bugs / debugging
None. It was verified against the brute-force "try every shift" implementation on 200 random images of varying
density.

## Alternatives considered
- Brute force over all shifts: O(n⁴), simpler to trust (used as the test oracle).
- Bit-packing each row into an integer and using AND + popcount per shift: fast, but the most complex to write.

## Complexity
- Time: O(A·B), where A, B are the numbers of 1s (worst case O(n⁴), typically much less).
- Space: O(n²) for the vote array and cell lists.

## Reusable pattern
**Pairwise difference voting / histogram of offsets.** When the question is "which relative shift aligns the most
things?", count the difference vector of every matching pair.

## What to take away personally
Rephrase "try every configuration and score it" as "let every contributing pair vote for the configuration it
supports". It often turns a search into counting.
