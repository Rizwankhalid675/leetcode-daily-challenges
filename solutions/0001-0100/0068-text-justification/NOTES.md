# 68. Text Justification

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, string, simulation |
| Link | https://leetcode.com/problems/text-justification/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Lay out words into lines of exactly `maxWidth` characters, packing as many words per line as fit. Spread spaces as
evenly as possible, with any extra spaces going to the left gaps. The last line, and any line with a single word, is
left-aligned and padded on the right.

## Key constraints
- Up to 300 words, maxWidth ≤ 100. The difficulty is in getting every rule right, not in performance.

## Approach
For each line:
1. **Pack greedily:** add words while `letters + nextWord + (number of gaps so far) ≤ maxWidth`, since each gap needs
   at least one space.
2. **Last line or a single word:** join with single spaces and pad the right.
3. **Otherwise:** `spaces = maxWidth − letters`, `base = ⌊spaces / gaps⌋`, and the first `spaces mod gaps` gaps get one
   extra space.

## Why it works
It's a direct encoding of each rule. The `extra` distribution gives the left gaps priority, and the gap sizes differ by
at most one.

## Edge cases
- A word exactly `maxWidth` long gets its own line (a single-word line, so padding is 0).
- A short final line.
- A middle line with one word must be left-justified, not divided by zero gaps.

## Complexity
- Time: O(total characters)
- Space: O(output)

## Testing note
Besides the three official examples, random inputs are checked for **invariants**: every line has exactly maxWidth
characters; the words come back in order; and in non-last lines the gap sizes differ by at most one and never increase
from left to right.

## Reusable pattern
**Simulation problems: turn each rule into a separate, obvious branch,** and test invariants rather than trying to
predict outputs by hand.
