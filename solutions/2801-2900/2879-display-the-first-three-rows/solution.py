# 2879. Display the First Three Rows
# https://leetcode.com/problems/display-the-first-three-rows/
# head(3) returns the first three rows.
import pandas as pd

def selectFirstRows(employees: pd.DataFrame) -> pd.DataFrame:
    return employees.head(3)
