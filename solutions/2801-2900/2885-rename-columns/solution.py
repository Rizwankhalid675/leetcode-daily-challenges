# 2885. Rename Columns
# https://leetcode.com/problems/rename-columns/
# rename with a mapping from old to new column names.
import pandas as pd

def renameColumns(students: pd.DataFrame) -> pd.DataFrame:
    return students.rename(columns={
        'id': 'student_id',
        'first': 'first_name',
        'last': 'last_name',
        'age': 'age_in_years',
    })
