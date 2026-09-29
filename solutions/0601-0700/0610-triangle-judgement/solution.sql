-- 610. Triangle Judgement
-- https://leetcode.com/problems/triangle-judgement/
-- Three lengths form a triangle exactly when each pair sums to more than the third side.
SELECT x, y, z,
       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle
FROM Triangle;
