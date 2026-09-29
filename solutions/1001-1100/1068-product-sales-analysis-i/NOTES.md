# 1068. Product Sales Analysis I

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/product-sales-analysis-i/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each sale, show the product's name, the year of the sale and the unit price.

## Approach
Join `Sales` to `Product` on `product_id` and select the three columns. Every sale references an existing product (foreign key), so an inner join loses nothing.

## Edge cases
- Products that were never sold (Samsung in the example) are not wanted, and the inner join drops them.
- One product sold in several years produces one row per sale, as required.

## Reusable pattern
**Look-up join: fact table (`Sales`) joined to a dimension table (`Product`) to replace an id with a name.**
