-- 262. Trips and Users
-- https://leetcode.com/problems/trips-and-users/
-- Inner-join each trip to unbanned client and unbanned driver rows, restrict to the 3 days, and per day ROUND(AVG(status <> completed), 2).
SELECT t.request_at AS Day,
       ROUND(AVG(t.status <> 'completed'), 2) AS `Cancellation Rate`
FROM Trips t
JOIN Users c ON c.users_id = t.client_id AND c.banned = 'No'
JOIN Users d ON d.users_id = t.driver_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;
