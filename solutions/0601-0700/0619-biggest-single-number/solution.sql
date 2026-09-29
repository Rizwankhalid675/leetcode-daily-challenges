-- 619. Biggest Single Number
-- https://leetcode.com/problems/biggest-single-number/
-- Keep numbers that occur exactly once, then take MAX; MAX over no rows yields NULL, which covers the "no single number" case.
SELECT MAX(num) AS num
FROM (
  SELECT num
  FROM MyNumbers
  GROUP BY num
  HAVING COUNT(*) = 1
) singles;
