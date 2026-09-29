-- 570. Managers with at Least 5 Direct Reports
-- https://leetcode.com/problems/managers-with-at-least-5-direct-reports/
-- Count direct reports per managerId, keep counts of at least 5, and join back to Employee for the name.
SELECT e.name
FROM Employee e
JOIN (
  SELECT managerId
  FROM Employee
  WHERE managerId IS NOT NULL
  GROUP BY managerId
  HAVING COUNT(*) >= 5
) m ON m.managerId = e.id;
