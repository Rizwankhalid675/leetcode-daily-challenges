-- 586. Customer Placing the Largest Number of Orders
-- https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/
-- Count orders per customer, sort by that count descending and take the top row (the answer is guaranteed unique).
SELECT customer_number
FROM orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;
