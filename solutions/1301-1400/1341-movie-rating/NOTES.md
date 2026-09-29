# 1341. Movie Rating

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/movie-rating/ |
| Context | Quest: Database / Grouping & Join Aggregation Library / Grouping & Aggregation |

## What it asks (own words)
Return two rows in one column: the user who rated the most movies, and the movie with the best average rating in February 2020. Ties go to the alphabetically smaller name.

## Approach
Each half is a "group, order by the metric then by name, take 1" query. They're wrapped as derived tables (so each can keep its own `ORDER BY ... LIMIT 1`) and stacked with `UNION ALL`.

## Edge cases
- **`UNION ALL`, not `UNION`**: if the top user's name happened to equal the top movie's title, `UNION` would deduplicate them into a single row.
- Tie-breaking is built into the `ORDER BY` (`COUNT(*) DESC, name` / `AVG DESC, title`).
- The February filter applies only to the movie half; the user half counts all ratings ever.
- February 2020 has 29 days.

## Reusable pattern
**Several independent "top-1" answers in one result: derived tables with their own `ORDER BY/LIMIT`, joined by `UNION ALL`.**
