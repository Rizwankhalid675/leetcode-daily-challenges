# 2878. Get the Size of a DataFrame
# https://leetcode.com/problems/get-the-size-of-a-dataframe/
# DataFrame.shape is (rows, columns); return it as a list.
import pandas as pd

def getDataframeSize(players: pd.DataFrame) -> List[int]:
    return list(players.shape)
