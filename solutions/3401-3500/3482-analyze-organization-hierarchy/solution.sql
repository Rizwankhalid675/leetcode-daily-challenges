-- 3482. Analyze Organization Hierarchy
-- https://leetcode.com/problems/analyze-organization-hierarchy/
-- Recursive CTE builds the ancestor/descendant closure (each employee paired with itself and everyone below). Level = number of ancestors (including self); team_size = descendants - 1; budget = sum of descendants' salaries.
WITH RECURSIVE closure AS (
  SELECT employee_id AS ancestor, employee_id AS descendant
  FROM Employees
  UNION ALL
  SELECT c.ancestor, e.employee_id
  FROM closure c
  JOIN Employees e ON e.manager_id = c.descendant
),
team AS (
  SELECT c.ancestor AS employee_id,
         COUNT(*) - 1 AS team_size,
         SUM(e.salary) AS budget
  FROM closure c
  JOIN Employees e ON e.employee_id = c.descendant
  GROUP BY c.ancestor
),
lvl AS (
  SELECT descendant AS employee_id, COUNT(*) AS level
  FROM closure
  GROUP BY descendant
)
SELECT e.employee_id, e.employee_name, l.level, t.team_size, t.budget
FROM Employees e
JOIN lvl l ON l.employee_id = e.employee_id
JOIN team t ON t.employee_id = e.employee_id
ORDER BY l.level, t.budget DESC, e.employee_name;
