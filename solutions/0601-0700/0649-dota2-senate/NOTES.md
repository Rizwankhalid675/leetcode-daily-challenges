# 649. Dota2 Senate

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, greedy, queue |
| Link | https://leetcode.com/problems/dota2-senate/ |
| Study plan | LeetCode 75 (Queue) |

## What it asks (own words)
Senators from two parties act in order, round after round. On a turn, a senator can permanently remove an opponent's
voting rights, or declare victory if only their own party is left. With everyone playing optimally, which party wins?

## Key constraints
- n up to 10⁴.

## Approach
**Greedy strategy:** on your turn, ban the **next** opposing senator who would act. That's the most urgent threat,
because they would otherwise ban one of yours soonest.

Simulate with two queues of turn positions. Compare the two fronts: the smaller position acts first and bans the
other front. The actor is re-queued at `position + n`, which is its turn in the next round. The first queue to empty
loses.

## Why it works
Banning a later opponent instead of the next one can never be better. The next opponent would act before any later
one, so leaving them free only gives the other party an extra move sooner. The `+ n` offset preserves turn order
across rounds without an explicit round counter.

## Edge cases
- A single senator wins immediately.
- Order matters more than count: "DDRRR" has more R's, but the D's act first and win.

## Complexity
- Time: O(n): each ban removes one senator, so there are at most n comparisons in total
- Space: O(n)

## Testing note
The tests compare against a literal round-by-round simulation of the same strategy (with wrap-around bans).

## Reusable pattern
**Round-robin simulation with queues, re-enqueueing with `+ n`** to represent "next round".
