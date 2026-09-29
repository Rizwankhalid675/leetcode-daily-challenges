# 381. Insert Delete GetRandom O(1) - Duplicates allowed

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, math, design, randomized |
| Link | https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/ |
| Context | Quest: System & Software Design / Data Structure Design Workshop / Data Structure Design |

## What it asks (own words)
A multiset with average O(1) insert, remove-one-copy and a random pick where each stored copy is equally likely (so a value's chance is proportional to how many copies it has). Insert reports whether the value was absent; remove reports whether it was present.

## Approach
- `vals`: a flat array with one slot per stored copy. A uniform random index gives exactly the required distribution.
- `pos`: value → Set of the indices where its copies sit.

Remove `val`:
1. take any index i from pos[val] and delete it;
2. pop the last array element (value `last`, index lastIdx);
3. if i ≠ lastIdx, put `last` into slot i and, in pos[last], swap lastIdx for i;
4. if pos[val] is now empty, drop the key so a later insert returns true.

## Why the swap is safe when last === val
Then pos[val] and pos[last] are the same Set: we already removed i, and now replace lastIdx with i, which leaves exactly the remaining copies. The emptiness check happens after this step, so it sees the right size.

## Edge cases
- Removing the copy that is already in the last slot (i = lastIdx): nothing to move.
- Negative values and values up to ±2³¹ are fine as Map keys.

## Complexity
- Time: O(1) average per operation
- Space: O(n)

## Testing note
Random operation sequences compared with a value→count map. After every step the test checks that the array holds the same multiset and that every stored index points at its value. getRandom is checked for membership, plus a loose frequency check (2/3 for a doubled value, with wide bounds so the test is not flaky).

## Reusable pattern
**Array + index map with swap-with-last deletion** gives O(1) removal and uniform sampling (the set version is 380).
