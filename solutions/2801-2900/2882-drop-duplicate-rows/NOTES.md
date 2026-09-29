# 2882. Drop Duplicate Rows

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/drop-duplicate-rows/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Several customers may share an email; keep only the first row for each email and discard the later ones.

## Approach
`drop_duplicates(subset='email', keep='first')` compares only the email column and keeps the earliest row of each group.

## Pandas notes
- Without `subset`, rows count as duplicates only if every column matches, which is not what is asked.
- `keep='first'` is the default but is written out for clarity; `keep='last'` and `keep=False` are the alternatives.
- The original row order is preserved.

## Reusable pattern
`drop_duplicates(subset=[...], keep=...)` for de-duplication on a key.
