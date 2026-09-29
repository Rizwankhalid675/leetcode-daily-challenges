-- 584. Find Customer Referee
-- https://leetcode.com/problems/find-customer-referee/
-- Keep customers whose referee is not 2, remembering that NULL referee_id must be tested explicitly with IS NULL.
SELECT name
FROM Customer
WHERE referee_id IS NULL OR referee_id <> 2;
