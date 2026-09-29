-- 1683. Invalid Tweets
-- https://leetcode.com/problems/invalid-tweets/
-- A tweet is invalid when its content has more than 15 characters; CHAR_LENGTH counts characters, not bytes.
SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;
