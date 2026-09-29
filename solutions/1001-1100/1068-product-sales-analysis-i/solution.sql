-- 1068. Product Sales Analysis I
-- https://leetcode.com/problems/product-sales-analysis-i/
-- Inner join each sale to its product to pick up the product name.
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON p.product_id = s.product_id;
