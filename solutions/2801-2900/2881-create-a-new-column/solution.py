# 2881. Create a New Column
# https://leetcode.com/problems/create-a-new-column/
# Add a bonus column equal to twice the salary column (vectorised).
import pandas as pd

def createBonusColumn(employees: pd.DataFrame) -> pd.DataFrame:
    employees['bonus'] = employees['salary'] * 2
    return employees
