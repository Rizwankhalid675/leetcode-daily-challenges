# 394. Decode String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack, recursion |
| Link | https://leetcode.com/problems/decode-string/ |
| Study plan | LeetCode 75 (Stack) |

## What it asks (own words)
Expand an encoding where `k[text]` means "text repeated k times". The brackets can nest.

## Key constraints
- Input length ≤ 30, but counts go up to 300 and the output up to 10⁵ characters.
- Counts can have several digits ("10[a]", "300[z]").

## Approach
Scan once, keeping `current` (the text being built at this nesting level) and `count` (digits read so far):
- digit → `count = count*10 + d`;
- `[` → push `(current, count)`, then start fresh at the new level;
- `]` → pop `(before, times)` and set `current = before + current.repeat(times)`;
- letter → append to `current`.

## Why it works
The stack mirrors the nesting. Each `]` closes the most recent `[`, whose saved context is on top. The inner text is
complete at that moment, so repeating and attaching it to the outer text is correct.

## Edge cases
- Multi-digit counts: accumulating digits instead of taking one character is the classic bug to avoid.
- Text with no encoding at all.
- Deep nesting (`2[2[2[a]b]]`).

## Complexity
- Time: O(output length)
- Space: O(output length + nesting depth)

## Testing note
The reference expands the innermost `k[letters]` with a regex until none remain. It's a different algorithm, compared
on 500 random nested encodings.

## Reusable pattern
**Stack of saved contexts for nested structures** (see also 1096 Brace Expansion II and calculators with
parentheses). The equivalent recursive-descent version uses the call stack instead.
