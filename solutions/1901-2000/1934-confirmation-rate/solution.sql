-- 1934. Confirmation Rate
-- https://leetcode.com/problems/confirmation-rate/
-- LEFT JOIN every signup to its confirmation requests; the rate is AVG of (action = confirmed), with 0 for users who made no requests.
SELECT s.user_id,
       ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c ON c.user_id = s.user_id
GROUP BY s.user_id;
