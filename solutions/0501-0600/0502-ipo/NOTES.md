# 502. IPO

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, greedy, sorting, heap-priority-queue |
| Link | https://leetcode.com/problems/ipo/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Starting with capital `w`, finish at most `k` distinct projects. A project can start only if current capital ≥ its requirement, and it adds its profit (capital is never spent). Maximize final capital.

## Approach
Greedy with a sorted list and a max-heap:
1. Sort project indices by required capital.
2. Each round, move every project that is now affordable into a max-heap keyed by profit.
3. Take the most profitable one; capital grows. If the heap is empty, nothing more can ever start, so stop.

## Why it works
Capital only grows, so a project that is affordable now stays affordable. Among the currently affordable projects, taking the biggest profit gives the largest capital, which makes at least as many projects affordable later as any other choice would (an exchange argument).

## Edge cases
- No affordable project at the start: return `w`.
- `k` larger than n: the heap empties and the loop stops early.
- Final capital ≤ 10⁹ + 10⁵·10⁴, which fits easily in a double.

## Complexity
- Time: O(n log n + k log n)
- Space: O(n)

## Testing note
An exhaustive search over all sequences of up to k distinct feasible projects on tiny inputs, plus a max-size timing run where everything is affordable, so the answer is w + the sum of all profits.

## Reusable pattern
**Sorted unlock list + heap of unlocked options**: a common greedy for "resources grow as you pick".
