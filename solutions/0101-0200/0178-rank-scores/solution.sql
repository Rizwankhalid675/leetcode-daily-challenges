-- 178. Rank Scores
-- https://leetcode.com/problems/rank-scores/
-- DENSE_RANK() over score descending gives tied scores the same rank with no gaps.
SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`
FROM Scores
ORDER BY score DESC;
