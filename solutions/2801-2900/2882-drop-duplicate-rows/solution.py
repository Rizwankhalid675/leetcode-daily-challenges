# 2882. Drop Duplicate Rows
# https://leetcode.com/problems/drop-duplicate-rows/
# drop_duplicates on the email column, keeping the first occurrence.
import pandas as pd

def dropDuplicateEmails(customers: pd.DataFrame) -> pd.DataFrame:
    return customers.drop_duplicates(subset='email', keep='first')
