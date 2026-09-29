# 92. Reverse Linked List II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list |
| Link | https://leetcode.com/problems/reverse-linked-list-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Reverse only the stretch of a singly linked list between positions left and right (1-indexed) and return the head.

## Approach
1. A dummy node in front of the head removes the special case left = 1.
2. Walk to `before`, the node just ahead of position left. Call the node after it `first`; it will end up at the end of the reversed part.
3. Repeat right − left times: unlink the node after `first` and insert it right after `before`.

## Why it works
After j steps, the first j + 1 nodes of the range sit in reverse order right after `before`, and `first` still links to the untouched rest. Each step extends the reversed prefix by one node, so right − left steps reverse the whole range.

## Edge cases
- left = right: no moves.
- left = 1: the dummy handles a new head.

## Complexity
- Time: O(n), one pass
- Space: O(1)

## Testing note
Compared with slicing and reversing a plain array on 1000 random lists and ranges.

## Reusable pattern
**Head insertion for in-place sublist reversal**: keep a fixed anchor before the range and repeatedly move the next node to right after the anchor.
