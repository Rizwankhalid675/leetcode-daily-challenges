# 1045. Customers Who Bought All Products

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/customers-who-bought-all-products/ |
| Context | Quest: Database / Grouping & Join Aggregation Library / Grouping & Aggregation |

## What it asks (own words)
Which customers have bought every product in the catalogue?

## Approach
Count each customer's **distinct** products and keep the customers whose count equals the size of `Product`.

## Why it works
`product_key` in `Customer` is a foreign key into `Product`, so a customer's distinct keys are a subset of the catalogue. A subset with the same size as the whole set must be the whole set.

## Edge cases
- Repeated purchases of the same product are collapsed by `DISTINCT` (without it, a customer buying product 5 twice would look like they bought two products).
- A NULL `product_key` would be ignored by `COUNT(DISTINCT ...)`.

## Reusable pattern
**Relational division ("X related to all Y"): `GROUP BY x HAVING COUNT(DISTINCT y) = (SELECT COUNT(*) FROM Y)`.**
