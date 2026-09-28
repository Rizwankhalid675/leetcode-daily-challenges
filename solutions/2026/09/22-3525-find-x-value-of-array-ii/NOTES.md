# 3525. Find X Value of Array II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-22 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | Array, Math, Segment Tree |
| Link | https://leetcode.com/problems/find-x-value-of-array-ii/ |
| Result | Accepted, 783/783 tests, 286 ms, 103 MB (submission 2156490309) |

## What it asks (own words)
Process queries in order. Each query permanently sets `nums[index] = value`, then (temporarily) looks at the array
from `start` onwards and asks: how many **non-empty prefixes** of that part have product ≡ x (mod k)?

## Key constraints
- n ≤ 10⁵, q ≤ 2·10⁴ → O(n·q) = 2·10⁹ is too slow. We need about O(log n) per query and update.
- k ≤ 5, a tiny residue space again (compare 3524).

## Reasoning
We need a structure that supports **point update** and **range query on a suffix**, where the query result
(a histogram of prefix-product residues) can be **merged** from pieces. That's what a segment tree does, provided
we can define the merge.

For a segment, store:
- `prod` = product of the segment mod k;
- `cnt[r]` = number of non-empty prefixes of the segment with product ≡ r.

**Merge L then R:** prefixes of the combined segment are either prefixes of L (`L.cnt` as is), or all of L followed
by a non-empty prefix of R: residue `L.prod · r`. So `cnt[(L.prod·r) % k] += R.cnt[r]`, and
`prod = L.prod · R.prod`. The merge is associative, which a segment tree requires, and it is **not
commutative**, so order matters.

## Algorithm
1. Build the tree over `nums` (leaf: `prod = v % k`, `cnt[v % k] = 1`).
2. For each query: point-update `index`, then query `[start, n−1]` by visiting covering nodes **left to right**,
   folding each into an accumulator `(accProd, accCnt)` with the same merge rule. Answer `accCnt[x]`.

## Why it works
The segment-tree decomposition of `[start, n−1]` is a left-to-right sequence of O(log n) disjoint nodes whose
concatenation is exactly that range. Folding them in order with an associative merge gives the same result as
merging element by element.

## JavaScript implementation details
- Flat typed arrays: `prod` is an `Int32Array(4n)` and `cnt` is an `Int32Array(4n · k)` indexed `node * k + r`.
  This avoids 400k small JS arrays (memory and GC pressure).
- `cnt.fill(0, from, to)` resets just one node's slice.
- The recursive query visits the left child before the right. That ordering is what makes the non-commutative merge
  correct; swapping them would be a subtle bug.
- `accProd` starts at `1 % k` (which is 0 when k = 1), so the k = 1 case needs no special handling.

## Edge cases
- `start = n − 1` → a single-element range.
- k = 1 → every prefix counts for x = 0.
- Updates persist across queries (the brute-force reference also mutates its copy).

## Bugs / debugging
None on submission. The main risk, merge order, was addressed in the design and verified against a brute force
that applies each update and scans prefixes directly (400 random cases), plus a full-size timing test.

## Optimization opportunity
286 ms / 103 MB passed comfortably. An iterative bottom-up tree would cut recursion overhead, and since queries are
always suffixes, a specialised structure could avoid the generic range walk.

## Alternatives considered
- Recomputing from `start` each query: O(n) per query, 2·10⁹ total, too slow.
- Sqrt decomposition with per-block (prod, cnt): O(√n · k) per query, simpler but slower.

## Complexity
- Build: O(n·k). Each update and query: O(k log n).
- Space: O(n·k).

## Reusable pattern
**Segment tree with a custom, associative (possibly non-commutative) monoid.** Define what a node stores, prove the
merge is associative, and remember to merge in order. The same framework covers max-subarray-sum nodes, matrix
products, string hashes, etc.

## What to take away personally
Part I's per-index histogram becomes Part II's node summary. When a Part II adds updates, ask "what summary of a
segment lets me glue two segments together?"
