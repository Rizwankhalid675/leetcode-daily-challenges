# 1683. Invalid Tweets

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/invalid-tweets/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Return the ids of tweets whose text is longer than 15 characters.

## Approach
Filter on `CHAR_LENGTH(content) > 15`.

## Why it works
In MySQL `LENGTH` counts **bytes**, while `CHAR_LENGTH` counts **characters**. The content here is ASCII, so both give the same answer, but `CHAR_LENGTH` matches the intent and stays right with multibyte text.

## Edge cases
- Exactly 15 characters is valid ("strictly greater" than 15 is invalid).
- Spaces and '!' count as characters.

## Reusable pattern
**String length in MySQL: use `CHAR_LENGTH` for "number of characters".**
