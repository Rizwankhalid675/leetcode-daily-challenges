# 1280. Students and Examinations

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/students-and-examinations/ |
| Context | Quest: Database / Grouping & Join Aggregation Library / Grouping & Aggregation |

## What it asks (own words)
For every student and every subject, how many times did the student sit that subject's exam? Pairs with no attendance must show 0.

## Approach
1. `Students CROSS JOIN Subjects` builds the full grid of (student, subject) pairs.
2. `LEFT JOIN Examinations` on **both** student and subject attaches each attendance row.
3. `COUNT(e.student_id)` counts only matched rows, so unmatched pairs give 0.

## Why it works
`COUNT(column)` skips NULLs, and the unmatched side of a LEFT JOIN is all NULL. `COUNT(*)` would wrongly return 1 for those pairs.

## Edge cases
- Students with no exams at all (Alex) still get one row per subject.
- Duplicate exam rows are counted separately (Alice's Math = 3).
- Sorted by `student_id`, then `subject_name`.

## Reusable pattern
**"Every combination, with zeros": CROSS JOIN the dimensions, then LEFT JOIN the facts and `COUNT(fact_col)`.**
