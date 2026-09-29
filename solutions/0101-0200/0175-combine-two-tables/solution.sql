-- 175. Combine Two Tables
-- https://leetcode.com/problems/combine-two-tables/
-- LEFT JOIN Person to Address so people without an address still appear (with NULL city/state).
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON a.personId = p.personId;
