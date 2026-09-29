# 622. Design Circular Queue

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, linked-list, design, queue |
| Link | https://leetcode.com/problems/design-circular-queue/ |
| Context | Quest: DSA / Sequence Valley / Assignment I (quiz) |

## What it asks (own words)
Implement a fixed-capacity FIFO ring buffer.

## Approach
Array of size k, `head` index and `size`. Enqueue writes at `(head + size) % k`; dequeue advances head; rear is `(head + size − 1) % k`.

## Why track size
With only head/tail indices, 'full' and 'empty' look the same (head === tail); a size counter (or one wasted slot) disambiguates.

## Complexity
- Time: O(1) per operation
- Space: O(k)

## Reusable pattern
**Ring buffer with modular indexing** — used in bounded queues, sliding windows, streaming.
