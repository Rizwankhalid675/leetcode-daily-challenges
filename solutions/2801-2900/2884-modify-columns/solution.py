# 2884. Modify Columns
# https://leetcode.com/problems/modify-columns/
# Overwrite the salary column with salary * 2.
import pandas as pd

def modifySalaryColumn(employees: pd.DataFrame) -> pd.DataFrame:
    employees['salary'] = employees['salary'] * 2
    return employees
