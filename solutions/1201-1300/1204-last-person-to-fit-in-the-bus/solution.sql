-- 1204. Last Person to Fit in the Bus
-- https://leetcode.com/problems/last-person-to-fit-in-the-bus/
-- Running total of weight in boarding order; the answer is the last person whose running total is still at most 1000.
SELECT person_name
FROM (
  SELECT person_name, turn,
         SUM(weight) OVER (ORDER BY turn) AS total_weight
  FROM Queue
) q
WHERE total_weight <= 1000
ORDER BY turn DESC
LIMIT 1;
