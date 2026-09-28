# 2462. Total Cost to Hire K Workers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, heap-priority-queue, simulation |
| Link | https://leetcode.com/problems/total-cost-to-hire-k-workers/ |
| Study plan | LeetCode 75 (Heap / Priority Queue) |

## What it asks (own words)
Hire k workers one at a time. Each round you may only pick from the first `candidates` and the last `candidates`
remaining workers; take the cheapest, breaking ties by the original index. Return the total cost.

## Key constraints
- n up to 10⁵ → a heap is needed, since re-scanning the candidate windows each round would be too slow.

## Approach
A single min-heap of worker **indices** ordered by (cost, index), plus two pointers:
- Start by pushing the first `candidates` indices (`left` advances) and the last `candidates` (`right` retreats),
  stopping if they meet so no worker is queued twice.
- Each round, pop the best worker. If unqueued workers remain in the middle (`left ≤ right`), refill from the same
  side the hire came from: index < `left` means the left group, otherwise the right group.

## Why it works
The heap always contains exactly the current left window and right window. Removing a worker from one side shifts that
window by one, which is precisely one refill from the middle on that side. The (cost, index) order implements the
tie-break.

## Edge cases
- 2·candidates ≥ n: everyone is queued at the start and no refills happen.
- Many equal costs: index ordering decides (the tests use costs 1..5 to force ties).

## Complexity
- Time: O((candidates + k) log candidates)
- Space: O(candidates)

## Testing note
Compared against a literal simulation of the rules (rebuilding the candidate pool every round) on 1000 random inputs.

## Reusable pattern
**A heap over indices with a composite comparator** (primary key, then tie-breaker), plus **two-ended refilling**.
