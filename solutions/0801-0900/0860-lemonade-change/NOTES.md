# 860. Lemonade Change

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, greedy |
| Link | https://leetcode.com/problems/lemonade-change/ |
| Context | Quest: DSA / Strategy Summit / Greedy |

## What it asks (own words)
Customers pay $5, $10 or $20 for a $5 drink, in order, and you start with no cash. Can you always give exact change?

## Approach
Only $5 and $10 bills are ever useful as change, so keep their counts.
- $5: keep it.
- $10: hand back a $5.
- $20: hand back $10 + $5 if possible, otherwise three $5s.

## Why it works
A $5 bill can make change for anything; a $10 can only help with a $20. So when a $20 arrives, spending the $10 first leaves us strictly better off than spending three $5s (any future need a $10 could cover, the extra $5s can cover too).

## Edge cases
- First customer pays $10 or $20: fail immediately.
- A $20 when we hold only $10s: fail.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an exhaustive search that tries both change options for every $20.

## Reusable pattern
**Greedy by flexibility**: spend the least-flexible resource first, keep the one that serves the most future cases.
