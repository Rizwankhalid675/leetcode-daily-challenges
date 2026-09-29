# 2890. Reshape Data: Melt
# https://leetcode.com/problems/reshape-data-melt/
# melt with product as the id column; the quarter columns become (quarter, sales) pairs.
import pandas as pd

def meltTable(report: pd.DataFrame) -> pd.DataFrame:
    return pd.melt(report, id_vars=['product'], var_name='quarter', value_name='sales')
