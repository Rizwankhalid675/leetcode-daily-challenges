# 2877. Create a DataFrame from List

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/create-a-dataframe-from-list/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Turn a list of [id, age] pairs into a table with columns `student_id` and `age`, keeping the input row order.

## Approach
Pass the nested list to the `pd.DataFrame` constructor and supply the column labels with `columns=`. Each inner list becomes one row, so the order is preserved.

## Pandas notes
- `pd.DataFrame(list_of_rows, columns=[...])` is row-oriented; a dict of lists would be column-oriented instead.
- The integer values stay `int64`, which is what the checker expects.
- `List` in the signature comes from LeetCode's preloaded `typing` imports; the template is kept verbatim.

## Reusable pattern
Nested lists as rows plus `columns=` is the quickest way to build a small table.
