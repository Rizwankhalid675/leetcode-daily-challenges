# 2888. Reshape Data: Concatenate
# https://leetcode.com/problems/reshape-data-concatenate/
# pd.concat stacks the two frames vertically.
import pandas as pd

def concatenateTables(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.concat([df1, df2], axis=0, ignore_index=True)
