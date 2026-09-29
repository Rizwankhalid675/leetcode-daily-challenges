# 2883. Drop Missing Data
# https://leetcode.com/problems/drop-missing-data/
# dropna restricted to the name column.
import pandas as pd

def dropMissingData(students: pd.DataFrame) -> pd.DataFrame:
    return students.dropna(subset=['name'])
