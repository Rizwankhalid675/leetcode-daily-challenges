# 14. Longest Common Prefix

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, string, trie |
| Link | https://leetcode.com/problems/longest-common-prefix/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Return the longest string that every input string starts with ("" if there is none).

## Key constraints
- Up to 200 strings of length ≤ 200, and strings may be empty.

## Approach
**Vertical scan:** for position i = 0, 1, …, check that every string has a character at i and that it matches the
first string's. Stop at the first failure.

## Why it works
The common prefix extends exactly as long as all strings agree character by character.

## Edge cases
- One string → itself.
- An empty string anywhere → "".
- A later string shorter than the first: the bounds check `i >= strs[k].length`.

## Complexity
- Time: O(S), the total characters examined (at most n × the shortest length + n)
- Space: O(1) besides the output

## Alternatives
- Horizontal: shrink a candidate prefix until every string starts with it (the test reference).
- Sort and compare only the first and last strings, which bound everything in between.

## Reusable pattern
**Vertical scanning with an early exit.** It stops as soon as the answer is known.
