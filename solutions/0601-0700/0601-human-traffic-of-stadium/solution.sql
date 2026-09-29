-- 601. Human Traffic of Stadium
-- https://leetcode.com/problems/human-traffic-of-stadium/
-- Gaps-and-islands: among rows with people >= 100, id - ROW_NUMBER() is constant within a run of consecutive ids; keep runs of length >= 3.
WITH busy AS (
  SELECT id, visit_date, people,
         id - CAST(ROW_NUMBER() OVER (ORDER BY id) AS SIGNED) AS grp
  FROM Stadium
  WHERE people >= 100
),
runs AS (
  SELECT id, visit_date, people,
         COUNT(*) OVER (PARTITION BY grp) AS run_len
  FROM busy
)
SELECT id, visit_date, people
FROM runs
WHERE run_len >= 3
ORDER BY visit_date;
