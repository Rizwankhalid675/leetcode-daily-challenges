# 1661. Average Time of Process per Machine

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/average-time-of-process-per-machine/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each machine, find the average duration of its processes (end time minus start time), rounded to 3 decimals.

## Approach
Self-join `Activity`: the `start` row (`s`) with the `end` row (`e`) of the same `(machine_id, process_id)`. Each pair gives one duration, and `AVG` per machine does the rest.

## Why it works
`(machine_id, process_id, activity_type)` is unique and every pair has exactly one start and one end, so the join yields exactly one row per process. The average of those rows is the total time divided by the number of processes.

## Edge cases
- Duration 0 (start equals end) is allowed and simply adds 0.
- `timestamp` is a FLOAT, so tiny representation errors exist. Rounding to 3 decimals absorbs them.

## Reusable pattern
**Turn "two rows per event" (start/end) into one row with a self-join on the event key, one side filtered to each type.** Conditional aggregation (`SUM(CASE WHEN type='end' THEN ts ELSE -ts END) / COUNT(DISTINCT process_id)`) is the join-free alternative.
