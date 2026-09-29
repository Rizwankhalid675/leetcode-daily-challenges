# 1502. Can Make Arithmetic Progression From Sequence

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, sorting |
| Link | https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/ |
| Context | Quest: Maths / Arithmetic Reasoning Terminal Station / Arithmetic & Basic Reasoning |

## What it asks (own words)
Can the numbers be reordered so each one is the previous plus a fixed step?

## Approach
If an arithmetic ordering exists it is the sorted order (increasing step) or its reverse. So sort numerically and check that every gap equals the first gap.

## Edge cases
- Two elements always work.
- A zero step (all equal) is valid.
- The sort needs a numeric comparator; the default string sort puts 10 before 9.

## Complexity
- Time: O(n log n)
- Space: O(n) for the sorted copy

## Testing note
Compared against a brute force that tries every ordered pair as the first two terms and rebuilds the whole progression.

## Reusable pattern
**Sorting reveals the canonical order**: for "can it be arranged as X" questions, check whether the sorted arrangement is the only candidate.
