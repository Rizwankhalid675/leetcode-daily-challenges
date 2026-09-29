# 432. All O`one Data Structure

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, linked-list, design, doubly-linked-list |
| Link | https://leetcode.com/problems/all-oone-data-structure/ |
| Context | Quest: System & Software Design / Data Structure Design Workshop / Data Structure Design |

## What it asks (own words)
Keep a counter per string with increment and decrement (a key disappears at zero), and at any moment return some key with the largest count and some key with the smallest count. Every operation must be O(1) on average.

## Approach
- A **doubly linked list of buckets** sorted by count, between sentinel `head` (count 0) and `tail` (count ∞). Each bucket stores a Set of keys with that exact count.
- `where`: key → its bucket.

`inc(key)`: the target count is (current count, or 0 for a new key) + 1. The bucket right after the current one (or after head) either already has that count, or we splice a new bucket in right there. Move the key, and unlink the old bucket if it became empty.

`dec(key)`: at count 1 the key just leaves; otherwise the target is the bucket right before, created if its count isn't count − 1. Unlink the old bucket if empty.

Min key = any key in `head.next`, max key = any key in `tail.prev`.

## Why it works
Counts only change by ±1, so a key's new bucket is always adjacent to its old one. The list therefore stays sorted without any searching.

## Edge cases
- Empty structure → "" for both queries (head.next is tail).
- The sentinel counts (0 and ∞) mean no special case is needed for "new key" or "last bucket".

## Complexity
- Time: O(1) average per operation
- Space: O(number of keys)

## Testing note
Random inc/dec sequences over five keys, compared with a count map. The returned max/min key must have the max/min count (any tied key is accepted, as the problem allows).

## Reusable pattern
**Linked list of count buckets** for ±1 updates with O(1) min/max (same idea as the LFU cache, 460).
