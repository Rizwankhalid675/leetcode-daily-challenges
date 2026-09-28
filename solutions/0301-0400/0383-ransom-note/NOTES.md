# 383. Ransom Note

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, string, counting |
| Link | https://leetcode.com/problems/ransom-note/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Can the note be spelled using the magazine's letters, each letter used at most once?

## Key constraints
- Up to 10⁵ lowercase letters each.

## Approach
Count the magazine's letters in an array of 26. For each note letter, decrement its count; if a count goes negative,
the note can't be built.

## Why it works
It's multiset containment: every letter must be available at least as many times as it's needed.

## Edge cases
- Repeated letters ("aa" from "ab" → false).

## Complexity
- Time: O(m + n)
- Space: O(26)

## Reusable pattern
**A fixed-alphabet counting array** is faster and simpler than a Map for lowercase letters.
