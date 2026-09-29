# 67. Add Binary

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, string, bit-manipulation, simulation |
| Link | https://leetcode.com/problems/add-binary/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Add two binary numbers given as strings and return the sum as a binary string.

## Approach
Walk both strings from the right, adding digit + digit + carry. Emit `sum & 1`, carry `sum >> 1`, and keep going while either string has digits left or a carry remains. Reverse at the end.

## Key constraints
- Up to 10⁴ digits, far beyond 2⁵³, so `parseInt`/`Number` would lose precision. Digit-by-digit addition avoids that.
- No leading zeros except "0" itself.

## Edge cases
- "0" + "0" = "0".
- A final carry adds one more digit ("1111" + "1").

## Complexity
- Time: O(max(|a|, |b|))
- Space: O(max(|a|, |b|))

## Testing note
Random strings up to 200 digits and one 10⁴-digit pair are compared with `BigInt` addition (used only in tests).

## Reusable pattern
**Right-to-left carry loop** (same as Add Two Numbers and Add Strings).
