-- 1661. Average Time of Process per Machine
-- https://leetcode.com/problems/average-time-of-process-per-machine/
-- Pair each start row with its end row (same machine and process), then average end - start per machine, rounded to 3 places.
SELECT s.machine_id, ROUND(AVG(e.timestamp - s.timestamp), 3) AS processing_time
FROM Activity s
JOIN Activity e
  ON e.machine_id = s.machine_id
 AND e.process_id = s.process_id
 AND e.activity_type = 'end'
WHERE s.activity_type = 'start'
GROUP BY s.machine_id;
