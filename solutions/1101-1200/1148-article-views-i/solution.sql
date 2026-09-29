-- 1148. Article Views I
-- https://leetcode.com/problems/article-views-i/
-- Authors who viewed their own article are rows where author_id = viewer_id; DISTINCT removes repeats, sorted by id.
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;
