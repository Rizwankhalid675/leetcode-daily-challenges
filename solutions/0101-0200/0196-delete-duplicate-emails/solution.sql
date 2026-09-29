-- 196. Delete Duplicate Emails
-- https://leetcode.com/problems/delete-duplicate-emails/
-- DELETE every row whose id is not the minimum id of its email group; the extra derived table sidesteps MySQL error 1093.
DELETE FROM Person
WHERE id NOT IN (
  SELECT keep_id
  FROM (
    SELECT MIN(id) AS keep_id
    FROM Person
    GROUP BY email
  ) AS keepers
);
