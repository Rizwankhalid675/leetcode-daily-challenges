# 2356. Number of Unique Subjects Taught by Each Teacher

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each teacher, count how many different subjects they teach, no matter how many departments teach each subject.

## Approach
`GROUP BY teacher_id` with `COUNT(DISTINCT subject_id)`.

## Edge cases
- Same subject in two departments (teacher 1, subject 2 in the example) counts once, thanks to `DISTINCT`.

## Reusable pattern
**"How many different X per Y": `COUNT(DISTINCT x) ... GROUP BY y`.**
