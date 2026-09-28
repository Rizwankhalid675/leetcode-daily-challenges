# Patterns across the September 2026 set

The 28 problems cluster into a handful of reusable ideas. Each pattern below lists the problems where it appeared,
the signal in the problem statement that should trigger it, and the core move.

## 1. Read the constraints first ("I / II" pairs)
**Problems:** 3875/3876, 3903/3904, 3870/3871, 3524/3525

Four pairs shared a statement and differed only in constraints or in one extra rule. The constraint picks the
algorithm:

| Pair | Part I | Part II | What changed |
|---|---|---|---|
| Uniform Parity | always true | compare `minOdd < minEven` | subtraction result must be ≥ 1 |
| Smallest Stable Index | O(n²) scan (n ≤ 100) | prefix max + suffix min, O(n) (n ≤ 10⁵) | n |
| Count Commas | loop over 1..n (n ≤ 10⁵) | sum over thresholds, O(log n) (n ≤ 10¹⁵) | n |
| Find X Value | histogram per right end | segment tree with (prod, prefix histogram) nodes | point updates + suffix queries |

**Habit:** the Part I solution is a free, trustworthy test oracle for Part II.

## 2. Prefix / suffix precomputation and "best so far"
**Problems:** 3904, 1477, 1614 (running balance)

**Signal:** every index needs an aggregate of everything to its left or right; or you need two non-overlapping
pieces.
**Move:** one pass builds `prefix[i]` / `suffix[i]`, or a running best, then answer each index in O(1).

## 3. Sliding window on positive arrays
**Problems:** 1477, 1658

**Signal:** contiguous subarray, target sum, **all values positive**.
**Move:** grow the right end; shrink the left while the sum is too large. Each index enters and leaves once, O(n).
**Warning:** with zeros or negatives, switch to prefix sums with a hash map.

## 4. Complement / change of viewpoint
**Problems:** 1658 (remove ends ⇔ keep middle), 3871 (commas per number ⇔ numbers per comma), 835 (try shifts ⇔
pairs vote for shifts), 3483 (enumerate choices ⇔ enumerate answers), 1190 (reverse ⇔ read backwards)

**Signal:** the direct search is exponential or quadratic, but there's an equivalent quantity that's easier to count.
**Move:** ask "what's left over?", "who contributes to what?", or "what is the answer space?".

## 5. Dynamic programming on sequences
**Problems:** 115, 940, 2472, 3414, 3524, 1621

| Problem | State | Key trick |
|---|---|---|
| 115 Distinct Subsequences | ways to build `t[0..j)` | iterate j **backwards** so each char of s is used once (0/1 knapsack style) |
| 940 Distinct Subsequences II | distinct subsequences ending in each letter | **replace, don't add**, to kill duplicates |
| 2472 Palindrome Substrings | best count for prefix | only palindromes of length k or k+1 matter (shrink argument) |
| 3414 Non-overlapping Intervals | (position, intervals left ≤ 4) | sort + binary search for the next compatible item; lexicographic tie-break carried in the DP value |
| 3524 X Value I | residue histogram of subarrays ending here | tiny state (k ≤ 5) |
| 1621 Line Segments | ways with j segments in points 0..i | prefix sums make transitions O(1) (used as the test oracle) |

## 6. Greedy on intervals, justified by structure
**Problems:** 1520, 3414 (contrast), 836

**Signal:** choose non-overlapping intervals to maximize count.
**Move:** earliest-end / innermost-first greedy, **only after** proving the candidates have a nice structure (1520:
nested-or-disjoint). When weights are involved (3414), greedy fails and DP is needed.

## 7. Bracket matching and stacks
**Problems:** 1614, 1807, 1190, 1096

| Problem | What the "stack" became |
|---|---|
| 1614 Nesting Depth | a single counter (only the size was needed) |
| 1807 Bracket Pairs | no stack needed: brackets aren't nested, so just find the next `)` |
| 1190 Reverse Substrings | a stack to pre-compute partners, then an O(n) walk that flips direction |
| 1096 Brace Expansion II | the call stack of a recursive-descent parser |

## 8. Search with augmented state
**Problem:** 3568

**Signal:** "shortest number of moves" with extra conditions (items collected, fuel).
**Move:** BFS over (position, bitmask of collected items, fuel). Prune with **dominance**: the same (position, mask)
with less fuel is useless.
**Hint:** a constraint like "at most 10 items" means a bitmask.

## 9. Trees: aggregate from children
**Problem:** 2265

**Move:** a post-order DFS returning a small tuple (sum, count). The parent combines children in O(1).

## 10. Segment trees with custom merges
**Problem:** 3525

**Move:** define what a node summarizes, prove the merge is associative, and **respect order** if it isn't
commutative (query left to right).

## 11. Math, geometry and counting
**Problems:** 3875, 3876 (parity algebra), 3871 (double counting), 1621 (bijection → binomial), 836 and 1401
(per-axis decomposition), 3550 and 3498 (digit / char arithmetic)

- Write the parity table: E−O = O, O−O = E, …
- Axis-aligned geometry decomposes into independent 1-D checks: interval overlap `max(starts) < min(ends)`, and
  the closest point is a per-axis clamp.
- Compare **squared** distances to stay in exact integers.
- Insert gaps to turn "≤" into "<" (stars and bars), giving a single binomial coefficient.

## 12. JavaScript-specific lessons
| Lesson | Where |
|---|---|
| Numbers are 64-bit floats: exact integers only up to 2⁵³ ≈ 9·10¹⁵ | 3871 (n ≤ 10¹⁵ is safe), 115 (why huge intermediates don't break the answer), 3524 (counts ≈ 5·10⁹ are safe) |
| Modular **multiplication** with a ~10⁹ modulus overflows 2⁵³, so use `BigInt` | 1621 |
| `%` keeps the dividend's sign: `-3 % 2 === -1`; add MOD before `%` after subtraction | 940, 3875 test |
| `/` is float division, so use `Math.floor` for integer division | 3483, 3550, 3568 |
| `new Array(n).fill([])` shares one array, so use `.fill(null).map(() => [])` | 3414 |
| Typed arrays (`Int8Array`, `Int32Array`) for large flat state tables | 3568, 835, 3525, 1190 |
| `new Map(arrayOfPairs)`, `??` versus `\|\|` | 1807 |
| Build strings with an array + `join` | 1807, 1190 |
| `Intl.NumberFormat` as a real-world test oracle | 3870 |
| Default `.sort()` is lexicographic, so numbers need a comparator | 1096, 3414 |

## 13. Testing lessons
- **Every non-trivial solution was checked against an independent brute force on random inputs** before
  submitting. This is why all 28 were accepted on the first submission.
- When a test fails, **check the test's assumption first** (3568: the stress test assumed a solvable grid).
- An oracle you can't read at a glance is not an oracle; replace it with the textbook version (1621).
- Tie-heavy random inputs (small weights) are what flush out tie-break bugs (3414).
