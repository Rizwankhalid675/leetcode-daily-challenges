-- 595. Big Countries
-- https://leetcode.com/problems/big-countries/
-- Filter with OR: a country is big if its area is at least 3,000,000 or its population is at least 25,000,000.
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
