# 1705. Maximum Number of Eaten Apples

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, greedy, heap-priority-queue |
| Link | https://leetcode.com/problems/maximum-number-of-eaten-apples/ |
| Context | Quest: DSA / Sequence Valley / Assignment I (quiz) |

## What it asks (own words)
Each day a tree may grow apples that rot after some days; you can eat at most one apple per day (also after the growing period). Maximize apples eaten.

## Approach
**Greedy: always eat the apple that rots soonest.** Keep batches `[rotDay, count]` in a min-heap by rotDay; each day add today's batch, drop rotten or empty batches, then eat one from the top.

## Why it works
Exchange argument: eating a later-rotting apple while an earlier-rotting one is available can only lose the earlier one; swapping never hurts.

## Edge cases
- Days with no apples (0, 0).
- Continue after the last growing day while batches remain.

## Complexity
- Time: O((n + D) log n), D = extra days after n (bounded by max rot day)
- Space: O(n)

## Testing note
Compared with a plain day-by-day simulation that re-sorts usable batches each day.

## Reusable pattern
**Earliest-deadline-first with a min-heap** (scheduling with expiry).
