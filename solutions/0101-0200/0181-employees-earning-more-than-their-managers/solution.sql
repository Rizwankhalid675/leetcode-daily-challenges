-- 181. Employees Earning More Than Their Managers
-- https://leetcode.com/problems/employees-earning-more-than-their-managers/
-- Self-join Employee to itself (employee row vs. manager row) and keep pairs where the employee earns more.
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON m.id = e.managerId
WHERE e.salary > m.salary;
