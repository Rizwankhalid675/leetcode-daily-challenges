-- 176. Second Highest Salary
-- https://leetcode.com/problems/second-highest-salary/
-- Scalar subquery: distinct salaries sorted descending, skip one, take one; an empty subquery becomes NULL.
SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;
