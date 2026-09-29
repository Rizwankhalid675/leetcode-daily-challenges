-- 626. Exchange Seats
-- https://leetcode.com/problems/exchange-seats/
-- Odd ids take the next student, even ids take the previous one, and an odd last id keeps its own student (LEAD/LAG window functions).
SELECT id,
       CASE
         WHEN id % 2 = 0 THEN LAG(student) OVER (ORDER BY id)
         WHEN LEAD(id) OVER (ORDER BY id) IS NULL THEN student
         ELSE LEAD(student) OVER (ORDER BY id)
       END AS student
FROM Seat
ORDER BY id;
