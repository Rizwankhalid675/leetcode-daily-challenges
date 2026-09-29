# 595. Big Countries

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/big-countries/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
List the name, population and area of every country that is big by area (at least 3 million) or big by population (at least 25 million).

## Approach
One `WHERE` with an `OR` of the two thresholds. Both limits are inclusive ("at least"), so use `>=`.

## Edge cases
- A country meeting both conditions appears once, since it is one row and `OR` does not duplicate rows (a `UNION ALL` of two filters would).
- Exact threshold values (3000000 or 25000000) qualify.

## Reusable pattern
**"At least" means `>=`, "more than" means `>`.** Most wrong answers on easy filters are off-by-one boundaries.
