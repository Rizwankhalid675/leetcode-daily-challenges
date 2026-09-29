# 2880. Select Data
# https://leetcode.com/problems/select-data/
# Boolean mask on student_id == 101, then keep only the name and age columns via .loc.
import pandas as pd

def selectData(students: pd.DataFrame) -> pd.DataFrame:
    return students.loc[students['student_id'] == 101, ['name', 'age']]
