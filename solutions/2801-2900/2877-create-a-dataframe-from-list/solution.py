# 2877. Create a DataFrame from List
# https://leetcode.com/problems/create-a-dataframe-from-list/
# Build the DataFrame straight from the 2D list, naming the two columns.
import pandas as pd

def createDataframe(student_data: List[List[int]]) -> pd.DataFrame:
    return pd.DataFrame(student_data, columns=['student_id', 'age'])
