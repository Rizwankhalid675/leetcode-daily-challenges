-- 1581. Customer Who Visited but Did Not Make Any Transactions
-- https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/
-- Anti-join: LEFT JOIN visits to transactions, keep visits with no match, then count them per customer.
SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t ON t.visit_id = v.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;
