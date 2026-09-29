-- 1527. Patients With a Condition
-- https://leetcode.com/problems/patients-with-a-condition/
-- A condition code starts with DIAB1 either at the very start of the string or right after a space.
SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';
