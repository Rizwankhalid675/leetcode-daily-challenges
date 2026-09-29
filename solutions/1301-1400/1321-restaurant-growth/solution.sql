-- 1321. Restaurant Growth
-- https://leetcode.com/problems/restaurant-growth/
-- Collapse to one total per day, then a 7-row sliding SUM over consecutive days; output from the 7th day on, average = sum / 7.
WITH daily AS (
  SELECT visited_on, SUM(amount) AS day_total
  FROM Customer
  GROUP BY visited_on
),
windowed AS (
  SELECT visited_on,
         SUM(day_total) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
         ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
  FROM daily
)
SELECT visited_on, amount, ROUND(amount / 7, 2) AS average_amount
FROM windowed
WHERE rn >= 7
ORDER BY visited_on;
