-- 1341. Movie Rating
-- https://leetcode.com/problems/movie-rating/
-- Two independent top-1 queries (most ratings by user; best Feb-2020 average by movie), each ordered with a name tie-break, glued with UNION ALL.
SELECT results FROM (
  SELECT u.name AS results
  FROM MovieRating r
  JOIN Users u ON u.user_id = r.user_id
  GROUP BY u.user_id, u.name
  ORDER BY COUNT(*) DESC, u.name
  LIMIT 1
) top_user
UNION ALL
SELECT results FROM (
  SELECT m.title AS results
  FROM MovieRating r
  JOIN Movies m ON m.movie_id = r.movie_id
  WHERE r.created_at BETWEEN '2020-02-01' AND '2020-02-29'
  GROUP BY m.movie_id, m.title
  ORDER BY AVG(r.rating) DESC, m.title
  LIMIT 1
) top_movie;
