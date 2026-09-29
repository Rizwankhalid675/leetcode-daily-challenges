# 709. To Lower Case

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string |
| Link | https://leetcode.com/problems/to-lower-case/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Convert uppercase letters in a string to lowercase.

## Approach
In ASCII, `'A'..'Z'` are 65–90 and lowercase letters are exactly 32 higher. Map each character: shift if it's in that range, keep it otherwise. (`s.toLowerCase()` is also accepted; this shows the mechanism.)

## Edge cases
- Neighbours of the range (`@` = 64, `[` = 91) must stay unchanged.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with the built-in on every printable ASCII character.

## Reusable pattern
**Character arithmetic on ASCII codes.**
