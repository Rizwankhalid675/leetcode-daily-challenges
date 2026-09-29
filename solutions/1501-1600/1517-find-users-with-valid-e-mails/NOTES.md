# 1517. Find Users With Valid E-Mails

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/find-users-with-valid-e-mails/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Keep the users whose email is valid: the part before the `@` starts with a letter and uses only letters, digits, `_`, `.` and `-`, and the domain is exactly `@leetcode.com` in lowercase.

## Approach
A regular expression anchored at both ends:
- `^[A-Za-z]`: the first character is a letter.
- `[A-Za-z0-9_.-]*`: then any allowed characters (possibly none).
- `@leetcode[.]com$`: the exact domain, and nothing after it.

## Why it works
- MySQL's default collation is case-**insensitive**, and so is a plain `REGEXP`. That would accept `@LEETCODE.COM`, which the rules reject. The `'c'` match type of `REGEXP_LIKE` forces case-sensitive matching.
- `[.]` is a literal dot without backslash escaping. An unescaped `.` would match any character, so `@leetcodeXcom` would pass.
- Inside the character class, `-` is last and `.` is literal, so neither needs escaping.
- The anchors reject extra text before the prefix or after `.com`.

## Edge cases
- Prefix starting with a digit, `.`, `_` or `-`: rejected.
- Prefix ending in `-` (`bella-@leetcode.com`): allowed, since only the first character is restricted.
- A one-letter prefix such as `a@leetcode.com`: allowed (`*` permits zero more characters).
- Uppercase domain, other domains, a second `@` or `#`: rejected.

## Reusable pattern
**Validate a format with an anchored regex, and in MySQL make it case-sensitive explicitly (`REGEXP_LIKE(s, p, 'c')` or `BINARY`).**
