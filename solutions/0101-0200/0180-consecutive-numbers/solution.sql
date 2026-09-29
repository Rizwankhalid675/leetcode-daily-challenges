-- 180. Consecutive Numbers
-- https://leetcode.com/problems/consecutive-numbers/
-- Triple self-join on id, id+1, id+2 requiring equal num; DISTINCT the matching numbers.
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l2.id = l1.id + 1 AND l2.num = l1.num
JOIN Logs l3 ON l3.id = l1.id + 2 AND l3.num = l1.num;
