# 933. Number of Recent Calls

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | design, queue, data-stream |
| Link | https://leetcode.com/problems/number-of-recent-calls/ |
| Study plan | LeetCode 75 (Queue) |

## What it asks (own words)
Design a counter where `ping(t)` records a request at time t and returns how many requests fall in the last 3000 ms,
inclusive (t − 3000 ≤ time ≤ t). Times strictly increase.

## Key constraints
- Up to 10⁴ calls, with strictly increasing t.

## Approach
A queue of timestamps. On each ping, push t, then drop from the front anything older than t − 3000. The answer is the
queue's length.

## Why it works
Because times only increase, once a timestamp is too old for one ping it's too old for every later ping. It can be
discarded forever, so the queue always holds exactly the in-window requests.

## JavaScript implementation details
`Array.prototype.shift()` is O(n) in general (it re-indexes the array). A **moving head index** over a plain array
gives amortized O(1) dequeues. Memory isn't reclaimed, but at 10⁴ calls that's irrelevant. A circular buffer or
periodic compaction would fix it for unbounded streams.

## Edge cases
- A request exactly 3000 ms older is still counted (the range is inclusive).

## Complexity
- Time: amortized O(1) per ping
- Space: O(number of pings)

## Reusable pattern
**Sliding time window over a monotonic stream → queue with eviction from the front.** It's the basis of rate limiters.
