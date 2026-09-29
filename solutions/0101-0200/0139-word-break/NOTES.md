# 139. Word Break

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, string, dynamic-programming, trie, memoization, brute-force-search |
| Link | https://leetcode.com/problems/word-break/ |
| Context | Quest: DSA / Strategy Summit / 2D Dynamic Programming |

## What it asks (own words)
Can the string be cut into pieces that are all dictionary words (words may repeat)?

## Key constraints
- |s| ≤ 300, words up to 20 chars, up to 1000 words. There are at most 20 distinct word lengths, so trying lengths beats trying words.

## Approach
ok[0] = true. For each end position i, prefix s[0..i) is splittable if, for some word length L, the prefix s[0..i−L) is splittable and s[i−L..i) is in the dictionary Set. Answer ok[n].

## Edge cases
- The classic trap: "aaa…ab" with words "a", "aa", …. Plain recursion blows up exponentially, but the DP fills each position once.

## Complexity
- Time: O(n · D · W), with D ≤ 20 distinct lengths and W ≤ 20 for slicing and hashing
- Space: O(n + dictionary size)

## Testing note
Compared with plain recursion on random a/b strings and dictionaries, plus the adversarial all-"a" case (timed).

## Reusable pattern
**Prefix-reachability DP**: a prefix is reachable if some shorter reachable prefix connects to it by one allowed piece.
