# 2889. Reshape Data: Pivot
# https://leetcode.com/problems/reshape-data-pivot/
# pivot with month as the index, city as the columns and temperature as the values.
import pandas as pd

def pivotTable(weather: pd.DataFrame) -> pd.DataFrame:
    return weather.pivot(index='month', columns='city', values='temperature')
