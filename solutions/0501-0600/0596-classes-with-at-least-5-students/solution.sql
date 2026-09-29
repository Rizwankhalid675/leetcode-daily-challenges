-- 596. Classes With at Least 5 Students
-- https://leetcode.com/problems/classes-with-at-least-5-students/
-- Group by class and keep groups with at least five distinct students (HAVING).
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;
