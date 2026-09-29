# 234. Palindrome Linked List

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | linked-list, two-pointers, stack, recursion |
| Link | https://leetcode.com/problems/palindrome-linked-list/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Does a singly linked list read the same forwards and backwards? The follow-up asks for O(1) extra space.

## Key constraints
- Up to 10⁵ nodes: a recursive solution risks stack overflow in JS, so everything here is loops.

## Approach
1. Slow/fast pointers stop `slow` at the end of the first half (the middle node for odd lengths).
2. Reverse the list after `slow` in place.
3. Walk the first half and the reversed second half together, comparing values.
4. Reverse the second half again and reattach it so the caller's list is unchanged.

## Edge cases
- One node → true.
- Odd length: the middle node stays in the first half and is never compared.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an array reverse check on random (often palindromic) lists, confirmed the list is restored afterwards, and ran two 10⁵-node lists.

## Reusable pattern
**Middle + reverse second half** — shared by reorder-list and max-twin-sum.
