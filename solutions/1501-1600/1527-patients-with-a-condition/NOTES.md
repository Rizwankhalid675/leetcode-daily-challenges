# 1527. Patients With a Condition

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/patients-with-a-condition/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Find patients with at least one condition code starting with `DIAB1`. The codes in `conditions` are separated by spaces.

## Approach
A code starts either at the beginning of the string or right after a space, so check both:
- `LIKE 'DIAB1%'`: the first code.
- `LIKE '% DIAB1%'`: any later code.

## Why it works
A bare `LIKE '%DIAB1%'` is wrong: it also matches codes that merely **contain** DIAB1, such as `SADIAB100` or `+DIAB100`. The judge has tests for exactly that. Requiring a space (or the start) before `DIAB1` enforces "code starts with".

## Edge cases
- Empty conditions: no match.
- `DIAB201` does not match (the prefix is DIAB2).
- `DIAB1` as a code by itself matches.

## Reusable pattern
**Token prefix in a space-separated list: `col LIKE 'p%' OR col LIKE '% p%'`**, or a regex with a word boundary / `(^| )p`.
