-- 1517. Find Users With Valid E-Mails
-- https://leetcode.com/problems/find-users-with-valid-e-mails/
-- Case-sensitive REGEXP_LIKE: a letter, then letters/digits/_/./-, then exactly '@leetcode.com' at the end.
SELECT user_id, name, mail
FROM Users
WHERE REGEXP_LIKE(mail, '^[A-Za-z][A-Za-z0-9_.-]*@leetcode[.]com$', 'c');
