-- 1045. Customers Who Bought All Products
-- https://leetcode.com/problems/customers-who-bought-all-products/
-- Per customer, count distinct products bought and compare with the total number of products (relational division).
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
