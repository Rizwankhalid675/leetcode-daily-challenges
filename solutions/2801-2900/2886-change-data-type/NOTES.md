# 2886. Change Data Type

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/change-data-type/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
The `grade` column holds whole numbers stored as floats (like 73.0). Convert it to an integer column.

## Approach
`astype({'grade': int})` casts only that column and leaves the others as they are.

## Pandas notes
- `int` maps to `int64`. The cast truncates toward zero, which is fine because the grades are whole numbers.
- `astype(int)` fails if the column has NaN. The statement gives no missing grades, so a plain cast is safe.
- Equivalent: `students['grade'] = students['grade'].astype(int)`.

## Reusable pattern
`df.astype({col: dtype})` for targeted type conversion.
