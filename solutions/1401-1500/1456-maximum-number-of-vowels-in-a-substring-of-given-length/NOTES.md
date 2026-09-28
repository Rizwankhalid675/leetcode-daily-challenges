# 1456. Maximum Number of Vowels in a Substring of Given Length

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, sliding-window |
| Link | https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/ |
| Study plan | LeetCode 75 (Sliding Window) |

## What it asks (own words)
Among all substrings of length exactly k, which one contains the most vowels? Return that count.

## Key constraints
- n up to 10⁵, lowercase letters only.

## Approach
Count vowels in the first k characters, then slide: +1 if the entering character is a vowel, −1 if the leaving one is.
Track the maximum, and stop early once it reaches k (it can't go higher).

## Why it works
Each window's count is derived exactly from the previous window's count in O(1).

## Edge cases
- No vowels → 0.
- The early exit when `best === k` is only an optimization. It never changes the result.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Fixed-size sliding window with a count** (same shape as 643). Separating "enter" and "leave" updates keeps the code
obviously correct.
