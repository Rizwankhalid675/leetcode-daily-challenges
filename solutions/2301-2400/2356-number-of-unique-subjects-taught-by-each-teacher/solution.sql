-- 2356. Number of Unique Subjects Taught by Each Teacher
-- https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/
-- Group by teacher and count distinct subject ids (the same subject in several departments counts once).
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
