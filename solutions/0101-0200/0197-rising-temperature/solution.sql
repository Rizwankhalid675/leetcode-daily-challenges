-- 197. Rising Temperature
-- https://leetcode.com/problems/rising-temperature/
-- Self-join each day to the day before (DATEDIFF = 1) and keep days that are warmer.
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
