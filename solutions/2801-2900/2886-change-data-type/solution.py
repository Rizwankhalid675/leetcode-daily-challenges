# 2886. Change Data Type
# https://leetcode.com/problems/change-data-type/
# Cast the grade column from float to int with astype.
import pandas as pd

def changeDatatype(students: pd.DataFrame) -> pd.DataFrame:
    return students.astype({'grade': int})
