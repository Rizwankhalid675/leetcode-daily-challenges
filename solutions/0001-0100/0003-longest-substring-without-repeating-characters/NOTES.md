# 3. Longest Substring Without Repeating Characters

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/longest-substring-without-repeating-characters/ |
| Study plan | Top Interview 150 (Sliding Window) |

## What it asks (own words)
What's the length of the longest block of consecutive characters with no repeated character?

## Key constraints
- Length up to 5·10⁴; any printable characters, including spaces.

## Approach
Sliding window plus a map of each character's **last index**. When the incoming character was last seen *inside* the
window (index ≥ left), jump `left` to just after that occurrence. Update the best length each step.

## Why it works
The window always holds distinct characters. When a duplicate enters, every window that still contains both copies is
invalid, so the smallest valid left edge is one past the earlier copy.

## Edge cases
- **"abba"**: at the final 'a', its last index (0) is *outside* the window (left = 2). Without the `>= left` check,
  `left` would move backwards to 1 and the answer would be wrong. This case is in the tests.
- Empty string → 0; a string that is just a space → 1.

## Complexity
- Time: O(n)
- Space: O(alphabet)

## Reusable pattern
**Longest window with a uniqueness constraint → last-seen index map, left jumps forward only** (`left = max(left, …)`).
