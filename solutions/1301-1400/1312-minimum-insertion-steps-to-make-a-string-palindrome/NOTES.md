# 1312. Minimum Insertion Steps to Make a String Palindrome

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Insert as few characters as possible (anywhere) to turn a string into a palindrome.

## Approach
Keep the longest palindromic subsequence (LPS) as the "spine"; each remaining character gets a twin inserted at the mirrored place. So the answer is `n − LPS`. LPS uses the interval DP L(i, j): matching ends add 2 to the inside, otherwise drop one end — rolled into one array with a saved diagonal.

## Why it works
Insertions never remove characters, so the original characters that end up paired with each other (or in the center) form a palindromic subsequence; all others need a new partner. Hence insertions ≥ n − LPS, and the mirroring construction achieves it.

## Edge cases
- Already a palindrome: 0.
- Length 1: 0.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
The oracle is a breadth-first search over actual insertions (short strings over up to 3 letters), independent of the LPS argument.

## Reusable pattern
**"Min insertions/deletions to make a palindrome" = n − LPS**; LPS itself is LCS(s, reverse(s)).
