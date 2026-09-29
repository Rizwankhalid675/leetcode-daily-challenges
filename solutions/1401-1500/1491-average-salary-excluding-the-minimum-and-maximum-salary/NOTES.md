# 1491. Average Salary Excluding the Minimum and Maximum Salary

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, sorting |
| Link | https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Average the salaries after dropping the single lowest and single highest (all values are distinct).

## Approach
Track sum, min and max in one pass; the answer is `(sum − min − max) / (n − 2)`. Sums stay below 10⁸, so doubles are exact until the final division.

## Edge cases
- n = 3: the answer is the middle value.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared (within 1e-5, as the judge allows) with sorting and averaging the middle slice.

## Reusable pattern
**One pass for several aggregates** instead of sorting.
