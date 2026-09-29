# 2887. Fill Missing Data
# https://leetcode.com/problems/fill-missing-data/
# fillna(0) on the quantity column.
import pandas as pd

def fillMissingValues(products: pd.DataFrame) -> pd.DataFrame:
    products['quantity'] = products['quantity'].fillna(0)
    return products
