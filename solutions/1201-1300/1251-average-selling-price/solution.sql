-- 1251. Average Selling Price
-- https://leetcode.com/problems/average-selling-price/
-- Match each sale to the price period containing its date, then weighted average = SUM(price * units) / SUM(units); products with no sales get 0.
SELECT p.product_id,
       ROUND(IFNULL(SUM(p.price * u.units) / SUM(u.units), 0), 2) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
  ON u.product_id = p.product_id
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;
