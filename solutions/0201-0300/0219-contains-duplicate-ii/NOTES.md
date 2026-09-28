# 219. Contains Duplicate II

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table, sliding-window |
| Link | https://leetcode.com/problems/contains-duplicate-ii/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Are there two equal values at most k positions apart?

## Key constraints
- n up to 10⁵ and k up to 10⁵.

## Approach
Keep a map of each value's **most recent** index. When the value appears again, check the distance to that index.

## Why it works
For any occurrence, the closest earlier equal value is the most recent one. If that isn't within k, no earlier one is.

## Edge cases
- k = 0 → always false, since the indices must be distinct.

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
A sliding-window Set of the last k values (add the new one, evict the one k+1 back): O(min(n, k)) space.

## Reusable pattern
**"Nearest previous occurrence" → a last-index map.**
