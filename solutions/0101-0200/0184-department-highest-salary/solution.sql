-- 184. Department Highest Salary
-- https://leetcode.com/problems/department-highest-salary/
-- Tag each employee with the max salary of their department (window MAX), keep rows equal to it, and join the department name.
SELECT d.name AS Department,
       x.name AS Employee,
       x.salary AS Salary
FROM (
  SELECT name, salary, departmentId,
         MAX(salary) OVER (PARTITION BY departmentId) AS top_salary
  FROM Employee
) x
JOIN Department d ON d.id = x.departmentId
WHERE x.salary = x.top_salary;
