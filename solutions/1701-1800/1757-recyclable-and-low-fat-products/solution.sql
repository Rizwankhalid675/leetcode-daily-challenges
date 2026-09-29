-- 1757. Recyclable and Low Fat Products
-- https://leetcode.com/problems/recyclable-and-low-fat-products/
-- Plain filter: keep products whose two Y/N flags are both Y.
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
