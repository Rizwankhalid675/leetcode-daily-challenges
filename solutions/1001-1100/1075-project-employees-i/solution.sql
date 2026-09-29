-- 1075. Project Employees I
-- https://leetcode.com/problems/project-employees-i/
-- Join projects to employees and average experience_years per project, rounded to 2 places.
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON e.employee_id = p.employee_id
GROUP BY p.project_id;
