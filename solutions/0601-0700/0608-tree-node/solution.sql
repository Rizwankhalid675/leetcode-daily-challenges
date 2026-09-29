-- 608. Tree Node
-- https://leetcode.com/problems/tree-node/
-- CASE per node: NULL parent means Root; otherwise Inner if some row names it as a parent, else Leaf.
SELECT t.id,
       CASE
         WHEN t.p_id IS NULL THEN 'Root'
         WHEN EXISTS (SELECT 1 FROM Tree c WHERE c.p_id = t.id) THEN 'Inner'
         ELSE 'Leaf'
       END AS type
FROM Tree t;
