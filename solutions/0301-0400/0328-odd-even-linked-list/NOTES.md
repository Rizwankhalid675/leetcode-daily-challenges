# 328. Odd Even Linked List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list |
| Link | https://leetcode.com/problems/odd-even-linked-list/ |
| Study plan | LeetCode 75 (Linked List) |

## What it asks (own words)
Reorder a linked list so that all nodes at odd positions (1st, 3rd, …) come first, followed by all nodes at even
positions, each group keeping its order. Use O(1) extra space.

## Key constraints
- Up to 10⁴ nodes, possibly an empty list. No new nodes and no arrays.

## Approach
Keep two tails, `odd` and `even`, plus the head of the even chain. Each step, the odd tail jumps over the even node
(`odd.next = even.next`), and the even tail jumps over the next odd node. At the end, attach `evenHead` after the last
odd node.

## Why it works
The nodes alternate odd/even, so skipping one node at a time separates the list into two chains, each in original
order. The loop condition (`even && even.next`) stops exactly when there's no further odd node to move.

## Edge cases
- Empty list, and lists of length 1 or 2 (tested for all lengths 0..20).
- Values are irrelevant: this is about positions, not odd/even values.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Split a list into interleaved chains by re-pointing `next`,** then concatenate. Keep a pointer to each chain's head
before you start rewiring.
