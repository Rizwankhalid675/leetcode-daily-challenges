-- 585. Investments in 2016
-- https://leetcode.com/problems/investments-in-2016/
-- Window counts per tiv_2015 value and per (lat, lon); sum tiv_2016 of rows whose tiv_2015 is shared and location is unique, rounded to 2 decimals.
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM (
  SELECT tiv_2016,
         COUNT(*) OVER (PARTITION BY tiv_2015) AS same_tiv,
         COUNT(*) OVER (PARTITION BY lat, lon) AS same_loc
  FROM Insurance
) x
WHERE same_tiv > 1
  AND same_loc = 1;
