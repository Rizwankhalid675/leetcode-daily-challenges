# 72. Edit Distance

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/edit-distance/ |
| Study plan | LeetCode 75 (DP - Multidimensional) |

## What it asks (own words)
What's the minimum number of single-character inserts, deletes and replacements needed to turn one word into another
(the Levenshtein distance)?

## Key constraints
- Lengths ≤ 500, so an O(m·n) = 2.5·10⁵ DP.

## Approach
`dp[i][j]` = the cost to turn the first i characters of word1 into the first j characters of word2.
- Base cases: `dp[i][0] = i` (delete everything) and `dp[0][j] = j` (insert everything).
- Last characters equal → `dp[i−1][j−1]` (nothing to do).
- Otherwise → 1 + the minimum of **replace** `dp[i−1][j−1]`, **delete** `dp[i−1][j]`, and **insert** `dp[i][j−1]`.

Keep two rows.

## Why it works
In an optimal edit sequence, the last character of word2 is produced in one of three ways: by keeping or replacing the
last character of word1, by inserting it (so word1's prefix must produce word2[0..j−1)), or word1's last character is
deleted. Each case leaves a smaller subproblem.

## Edge cases
- Empty strings on either side, and identical strings.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
The reference runs BFS over strings, applying all three operations literally, on tiny binary strings. It shares
nothing with the DP except the definition.

## Reusable pattern
**Two-string DP with three transitions** (compare 1143 LCS, which has two). Swapping in weighted costs gives
sequence-alignment algorithms.
