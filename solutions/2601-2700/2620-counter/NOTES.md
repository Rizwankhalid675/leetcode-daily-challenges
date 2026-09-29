# 2620. Counter

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/counter/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Build a counter function: the first call returns `n`, and each later call returns one more than the previous.

## Approach
The parameter `n` lives on in the closure. `return n++` hands back the current value and then bumps it for next time.

## Edge cases
- Negative starts pass through zero normally.
- Two counters get separate closures, so they never interfere.

## Complexity
- Time: O(1) per call
- Space: O(1)

## Testing note
The official examples, plus a check that two counters stay independent.

## Reusable pattern
**Closure as private mutable state**: the variable is reachable only through the returned function.
