# 1757. Recyclable and Low Fat Products

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/recyclable-and-low-fat-products/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Return the ids of the products that are flagged both low-fat and recyclable.

## Approach
A single `WHERE` with both conditions joined by `AND`.

## Edge cases
- Both columns are 'Y'/'N' enums with no NULLs, so there is no three-valued-logic surprise.
- No qualifying products: an empty result is correct.

## Reusable pattern
**"Rows that satisfy A and B" is just `WHERE A AND B`.** Start every SQL problem by asking whether a single-table filter is all that is needed.
