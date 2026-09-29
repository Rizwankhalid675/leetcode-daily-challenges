# 1358. Number of Substrings Containing All Three Characters

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/ |
| Context | Quest: DSA / Recursion Maze / Sliding Window |

## What it asks (own words)
Given a string of only a, b, c, count the substrings that contain each of the three letters at least once.

## Key constraints
- 3 <= length <= 5 * 10^4; the answer can reach about 1.25 * 10^9, still exact in a double.

## Approach
Track the latest index of each letter. At position `i`, a substring ending at `i` contains all three letters exactly when its start is at or before `min(lastA, lastB, lastC)`. That gives `min + 1` valid starts (0 when a letter hasn't appeared, since min is -1).

## Why it works
This is the sliding-window "shrink until invalid" idea written in closed form: the leftmost boundary of the window is set by whichever letter was seen least recently.

## Edge cases
- A letter never appears: the min stays -1, adding 0 every step.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random a/b/c strings compared against an O(n^2) set-based enumeration; a periodic max-length string checks the closed-form total.

## Reusable pattern
**Count substrings ending at i: number of valid starts = leftmost blocking index + 1.**
