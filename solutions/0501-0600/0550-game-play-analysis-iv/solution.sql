-- 550. Game Play Analysis IV
-- https://leetcode.com/problems/game-play-analysis-iv/
-- Find each player's first login, count the players who also logged in the next day, and divide by the number of players.
SELECT ROUND(COUNT(a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM (
  SELECT player_id, MIN(event_date) AS first_login
  FROM Activity
  GROUP BY player_id
) f
JOIN Activity a
  ON a.player_id = f.player_id
 AND DATEDIFF(a.event_date, f.first_login) = 1;
