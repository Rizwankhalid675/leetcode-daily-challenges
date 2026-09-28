# 49. Group Anagrams

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, string, sorting |
| Link | https://leetcode.com/problems/group-anagrams/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Put words that are rearrangements of each other into the same group.

## Key constraints
- Up to 10⁴ words of length ≤ 100.

## Approach
Map each word to a **canonical key** shared by exactly its anagrams: the 26 letter counts joined with a separator. Group
the words by that key.

## Why it works
Two words are anagrams iff their letter counts are equal, which means their keys are equal.

## Edge cases
- The empty string (key of all zeros).
- The separator matters: without one, counts like [1, 11] and [11, 1] could produce the same key (compare 2352).

## Complexity
- Time: O(n · L) plus key hashing
- Space: O(n · L)

## Alternatives
Key = the sorted word (`[...w].sort().join('')`): O(L log L) per word. It's simpler, and it's the test reference.

## Reusable pattern
**Group by canonical form.** Pick a key that is invariant under the equivalence you care about.
