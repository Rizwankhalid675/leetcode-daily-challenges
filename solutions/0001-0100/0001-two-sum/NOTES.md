# 1. Two Sum

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table |
| Link | https://leetcode.com/problems/two-sum/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Return the indices of the two different elements that add up to the target (exactly one answer exists).

## Key constraints
- n up to 10⁴ and values up to ±10⁹. The follow-up asks for better than O(n²).

## Approach
One pass with a Map of value → index. For each element, look up `target − value` among the elements already seen; if
it's there, return both indices. Otherwise store the current element.

## Why it works
For the answer pair (i < j), when the scan reaches j, element i is already in the map. Checking before inserting
prevents pairing an element with itself.

## Edge cases
- Equal values ([3, 3] with target 6): check before insert, then insert.
- Negative numbers and large magnitudes: sums up to 2·10⁹ are exact in JS.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
**Complement lookup in a hash map.** It's the root of 1679, 560 (prefix-sum counts) and 454 (4Sum II).
