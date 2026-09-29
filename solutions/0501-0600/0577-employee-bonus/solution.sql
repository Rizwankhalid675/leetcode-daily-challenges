-- 577. Employee Bonus
-- https://leetcode.com/problems/employee-bonus/
-- LEFT JOIN Bonus and keep employees whose bonus is under 1000 or missing (NULL).
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON b.empId = e.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;
