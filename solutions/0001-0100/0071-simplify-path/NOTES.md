# 71. Simplify Path

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack |
| Link | https://leetcode.com/problems/simplify-path/ |
| Study plan | Top Interview 150 (Stack) |

## What it asks (own words)
Convert an absolute Unix path to its canonical form: collapse repeated slashes, resolve `.` and `..`, and remove any
trailing slash. Names like `...` are ordinary directory names.

## Key constraints
- Length ≤ 3000.

## Approach
Split on "/" and keep a stack of directory names: skip empty parts and ".", pop on ".." (popping an empty stack at the
root does nothing), and push anything else. Return "/" + the stack joined with "/".

## Why it works
Each ".." cancels the most recent directory still in effect, which is the top of the stack. Empty parts come from
repeated or trailing slashes.

## Edge cases
- "/../" → "/" (you can't go above the root).
- "..." is a name, not an operator.
- Trailing slashes.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared against Node's own `path.posix.normalize` on 2000 random absolute paths, after stripping its trailing slash.
Using the platform's implementation as the oracle is the same idea as `Intl.NumberFormat` for 3870.

## Reusable pattern
**Path/expression normalization with a stack of tokens.**
