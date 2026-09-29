# 2891. Method Chaining
# https://leetcode.com/problems/method-chaining/
# One chain: filter weight > 100, sort by weight descending, keep only the name column.
import pandas as pd

def findHeavyAnimals(animals: pd.DataFrame) -> pd.DataFrame:
    return animals[animals['weight'] > 100].sort_values('weight', ascending=False)[['name']]
