# 1507. Reformat Date

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string |
| Link | https://leetcode.com/problems/reformat-date/ |
| Context | Quest: DSA / Sequence Valley / Assignment II (quiz) |

## What it asks (own words)
Convert dates like "20th Oct 2052" into "2052-10-20".

## Approach
Split on spaces; `parseInt` reads the leading digits and ignores the ordinal suffix (st/nd/rd/th); map the month abbreviation through an array; `padStart(2, '0')`.

## Complexity
- Time: O(1)
- Space: O(1)

## JavaScript note
`parseInt('20th', 10)` → 20: parsing stops at the first non-digit — handy for suffix stripping.

## Reusable pattern
Lookup tables + `padStart` for date/number formatting.
