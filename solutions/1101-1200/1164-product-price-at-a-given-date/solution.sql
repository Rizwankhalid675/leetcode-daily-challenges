-- 1164. Product Price at a Given Date
-- https://leetcode.com/problems/product-price-at-a-given-date/
-- Products whose first change is after 2019-08-16 still cost 10; otherwise take the new_price of the latest change on or before that date.
SELECT product_id, new_price AS price
FROM Products
WHERE (product_id, change_date) IN (
  SELECT product_id, MAX(change_date)
  FROM Products
  WHERE change_date <= '2019-08-16'
  GROUP BY product_id
)
UNION ALL
SELECT product_id, 10 AS price
FROM Products
GROUP BY product_id
HAVING MIN(change_date) > '2019-08-16';
