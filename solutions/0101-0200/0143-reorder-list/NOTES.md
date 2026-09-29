# 143. Reorder List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers, stack, recursion |
| Link | https://leetcode.com/problems/reorder-list/ |
| Context | Quest: DSA / Recursion Maze / Assignment II (quiz) |

## What it asks (own words)
Rearrange a singly linked list in place to go first, last, second, second-to-last, and so on. Node values must not change; only links move.

## Key constraints
- Up to 5 * 10^4 nodes, so a recursive solution could overflow the stack.

## Approach
1. Slow/fast pointers stop `slow` at the end of the first half (the first half gets the extra node on odd lengths).
2. Cut the list there and reverse the second half in place.
3. Interleave: take one from the front half, one from the reversed back half, until the back half runs out.

## Edge cases
- 0, 1 or 2 nodes: nothing changes.
- Odd length: the middle node ends up last, and its `next` is already null after the cut.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
The test builds a list, calls the function (which returns nothing), and reads the same head back. Every length up to 40 is checked against an index-based two-pointer expectation, plus one max-length list.

## Reusable pattern
**Middle + reverse + merge**, the standard toolkit for linked-list palindrome and reorder problems.
