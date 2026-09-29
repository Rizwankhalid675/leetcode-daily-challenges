-- 1327. List the Products Ordered in a Period
-- https://leetcode.com/problems/list-the-products-ordered-in-a-period/
-- Join products to their February 2020 orders, sum units per product, and keep sums of at least 100.
SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON o.product_id = p.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;
