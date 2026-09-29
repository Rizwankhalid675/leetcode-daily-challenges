# 1148. Article Views I

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/article-views-i/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Find every author who viewed at least one of their own articles, listed once each in ascending id order, in a column named `id`.

## Approach
A self-view is a row with `author_id = viewer_id`. `DISTINCT` collapses authors who did it several times (the table can also hold exact duplicate rows), and `ORDER BY id` gives the required order.

## Edge cases
- Duplicate rows, and several self-views by one author: handled by `DISTINCT`.
- The output column must be renamed to `id`.

## Reusable pattern
**"Each X at least once" means `SELECT DISTINCT` (or `GROUP BY`).** Whenever the table allows duplicates, ask whether the answer should.
