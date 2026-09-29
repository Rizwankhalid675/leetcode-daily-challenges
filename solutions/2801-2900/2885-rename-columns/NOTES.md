# 2885. Rename Columns

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/rename-columns/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Give the four columns new names: `id`, `first`, `last` and `age` become `student_id`, `first_name`, `last_name` and `age_in_years`.

## Approach
`rename(columns={old: new, ...})` returns a copy with the labels swapped; the data and column order are untouched.

## Pandas notes
- `rename` ignores keys that are not present (unless `errors='raise'`). A mapping is safer than assigning a full `df.columns = [...]` list, which depends on column order.

## Reusable pattern
`df.rename(columns=mapping)` for relabelling.
