-- 1731. The Number of Employees Which Report to Each Employee
-- https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/
-- Self-join employees to their direct reports; per manager, count the reports and round their average age.
SELECT m.employee_id, m.name,
       COUNT(*) AS reports_count,
       ROUND(AVG(r.age)) AS average_age
FROM Employees m
JOIN Employees r ON r.reports_to = m.employee_id
GROUP BY m.employee_id, m.name
ORDER BY m.employee_id;
