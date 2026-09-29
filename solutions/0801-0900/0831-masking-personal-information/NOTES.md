# 831. Masking Personal Information

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string |
| Link | https://leetcode.com/problems/masking-personal-information/ |
| Context | Quest: DSA / Sequence Valley / String |

## What it asks (own words)
Mask an email or phone number following fixed formatting rules.

## Approach
- **Email:** lowercase everything; name → first letter + `*****` + last letter; keep domain.
- **Phone:** strip non-digits; last 10 digits are local → `***-***-XXXX`; extra leading digits (0–3) become `+` plus that many stars and a dash.

## Edge cases
- The number of stars in the name part is always exactly 5, regardless of name length.
- Country code lengths 1–3.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
Normalize input (lowercase / strip separators) before formatting; regex `\D` removes all non-digits.
