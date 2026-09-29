# 239. Sliding Window Maximum

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, queue, sliding-window, heap-priority-queue, monotonic-queue, range-minimum-maximum-query |
| Link | https://leetcode.com/problems/sliding-window-maximum/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension III |

## What it asks (own words)
Slide a window of width k across the array and report the maximum at every position.

## Key constraints
- n up to 10⁵ with k up to n → O(n·k) is too slow; `Array.shift()` is O(n) per call, so use a head index.

## Approach: monotonic deque
Keep indices whose values are strictly decreasing from head to tail:
- Before adding i, pop tail indices with value ≤ nums[i]; they can never be a maximum again (i is newer and at least as big).
- If the head index fell out of the window (≤ i − k), advance head.
- Once the first window is full, the head is the maximum.

The deque lives in an `Int32Array` of size n with `head`/`tail` pointers, since each index is pushed once, no wrap-around is needed.

## Edge cases
- k = 1 → the array itself; k = n → a single maximum.
- Duplicates: popping on `<=` keeps the newest copy, which expires last.

## Complexity
- Time: O(n) (each index pushed and popped at most once)
- Space: O(n)

## Testing note
Compared with a slice-and-max brute force on random arrays; timing check at n = 10⁵ with both monotone orders.

## Reusable pattern
**Monotonic deque for sliding-window extremes**, implemented with head/tail indices instead of `shift()`.
