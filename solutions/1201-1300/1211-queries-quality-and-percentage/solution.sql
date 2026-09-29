-- 1211. Queries Quality and Percentage
-- https://leetcode.com/problems/queries-quality-and-percentage/
-- Per query_name: quality = AVG(rating / position), poor % = AVG(rating < 3) * 100, both rounded to 2 places.
SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(AVG(rating < 3) * 100, 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;
