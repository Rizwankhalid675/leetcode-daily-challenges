# 1668. Maximum Repeating Substring

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string, dynamic-programming, string-matching |
| Link | https://leetcode.com/problems/maximum-repeating-substring/ |
| Context | Quest: DSA / Sequence Valley / Assignment II (quiz) |

## What it asks (own words)
Largest k such that word repeated k times appears in sequence.

## Approach
Increase k while `word.repeat(k+1)` is still a substring. Works because if the k-fold repeat appears, so does every smaller repeat (monotone).

## Edge cases
- The greedy 'scan left to right counting consecutive matches' approach fails when occurrences overlap differently (the long example); checking the repeated string directly avoids that pitfall.

## Complexity
- Time: O(k · n · |word|) worst case — tiny here (lengths ≤ 100)
- Space: O(n)

## Reusable pattern
Monotone property + incremental check; KMP/DP versions exist for large inputs.
