-- 1070. Product Sales Analysis III
-- https://leetcode.com/problems/product-sales-analysis-iii/
-- Compute each product's first year with MIN(year) OVER (PARTITION BY product_id) and keep every sale from that year.
SELECT product_id, year AS first_year, quantity, price
FROM (
  SELECT product_id, year, quantity, price,
         MIN(year) OVER (PARTITION BY product_id) AS first_sale_year
  FROM Sales
) s
WHERE year = first_sale_year;
