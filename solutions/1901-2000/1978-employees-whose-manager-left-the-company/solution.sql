-- 1978. Employees Whose Manager Left the Company
-- https://leetcode.com/problems/employees-whose-manager-left-the-company/
-- Low earners (< 30000) whose manager_id is set but no longer exists as an employee_id (NOT EXISTS anti-join), ordered by id.
SELECT e.employee_id
FROM Employees e
WHERE e.salary < 30000
  AND e.manager_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id
  )
ORDER BY e.employee_id;
