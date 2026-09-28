# 901. Online Stock Span

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | stack, design, monotonic-stack, data-stream |
| Link | https://leetcode.com/problems/online-stock-span/ |
| Study plan | LeetCode 75 (Monotonic Stack) |

## What it asks (own words)
Prices arrive one per day. For each new price, report how many consecutive days, ending today, had a price ≤ today's.

## Key constraints
- Up to 10⁴ calls.

## Approach
A stack of `[price, span]` pairs with **strictly decreasing** prices. For a new price, pop every entry with price ≤
the new one, adding its span to the running span (starting at 1 for today). Push `[price, span]`.

## Why it works
A popped entry's span already counted a run of days all ≤ that entry's price, which is ≤ today's price. So those days
all belong in today's span. The first entry that isn't popped is strictly higher, which stops the run. Popped entries
are never needed again, because today's entry covers them.

## Edge cases
- Equal prices are absorbed (≤).
- A rising sequence keeps absorbing everything.

## Complexity
- Time: O(1) amortized per call
- Space: O(n)

## Reusable pattern
**Monotonic stack with aggregated counts.** Popped elements donate their accumulated information (here, spans) to the
element that dominates them. Compare 739.
