-- 620. Not Boring Movies
-- https://leetcode.com/problems/not-boring-movies/
-- Filter to odd ids whose description is not "boring", sorted by rating descending.
SELECT id, movie, description, rating
FROM cinema
WHERE id % 2 = 1
  AND description <> 'boring'
ORDER BY rating DESC;
