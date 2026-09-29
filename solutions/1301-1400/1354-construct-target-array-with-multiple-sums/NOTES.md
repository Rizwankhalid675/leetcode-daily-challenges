# 1354. Construct Target Array With Multiple Sums

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, heap-priority-queue |
| Link | https://leetcode.com/problems/construct-target-array-with-multiple-sums/ |
| Context | Quest: DSA / Sequence Valley / Heap |

## What it asks (own words)
Start from all ones; a step replaces any one element with the current total sum. Can you reach `target`?

## Key constraints
- n up to 5·10⁴, values up to 10⁹ → forward search is hopeless; even a naive backward walk can take 10⁹ steps.

## Approach: reverse the process
The element set most recently is the **largest** one (it equals the old total, which exceeded every element). Before that step it was `largest − rest`, where rest = sum of the others. If it stays the largest after subtracting, we'd subtract `rest` again — so jump directly to `largest % rest` (a max-heap tracks the largest).

Stop conditions:
- largest = 1 → everything is 1 → true;
- rest = 1 → we can always reduce the largest to exactly 1 → true (the modulo would give 0, so handle first);
- rest = 0 (single element > 1), largest ≤ rest, or `largest % rest === 0` → impossible.

## Why the modulo is valid
Repeated subtraction of the same `rest` is exactly what the reverse process does while this element remains the maximum; modulo performs all of those steps at once.

## Edge cases
- [1, 10⁹]: without modulo this would take 10⁹ iterations (tested).
- Single element: only [1] is reachable.

## Complexity
- Time: O(n + log(max) · log n) roughly (each modulo at least halves the largest in the Euclid-like way)
- Space: O(n)

## Testing note
Compared with a forward BFS from all-ones on small targets (values ≤ 12, n ≤ 3).

## Reusable pattern
**Reverse a process when the last step is forced** (here: the maximum), and **replace repeated subtraction with modulo** (Euclid-style).
