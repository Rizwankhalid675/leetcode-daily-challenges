-- 602. Friend Requests II: Who Has the Most Friends
-- https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/
-- Each accepted request adds a friend to both sides: stack requester and accepter ids with UNION ALL, count per id, take the top one.
SELECT id, COUNT(*) AS num
FROM (
  SELECT requester_id AS id FROM RequestAccepted
  UNION ALL
  SELECT accepter_id AS id FROM RequestAccepted
) ids
GROUP BY id
ORDER BY num DESC
LIMIT 1;
