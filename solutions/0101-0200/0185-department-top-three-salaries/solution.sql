-- 185. Department Top Three Salaries
-- https://leetcode.com/problems/department-top-three-salaries/
-- DENSE_RANK salaries within each department and keep ranks 1 to 3, so ties share a rank.
SELECT d.name AS Department, t.name AS Employee, t.salary AS Salary
FROM (
  SELECT name, salary, departmentId,
         DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk
  FROM Employee
) t
JOIN Department d ON d.id = t.departmentId
WHERE t.rnk <= 3;
