# 2891. Method Chaining

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/method-chaining/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
List the names of animals heavier than 100 kg, heaviest first.

## Approach
Chain three steps: a boolean filter `weight > 100` (strict), `sort_values('weight', ascending=False)`, then the projection `[['name']]`. The sort happens before the projection, while `weight` is still available.

## Pandas notes
- Double brackets `[['name']]` return a DataFrame; single brackets would return a Series.
- `sort_values` is not stable by default (quicksort). The example has no equal weights, and the task does not define a tie order.

## Reusable pattern
Filter, then sort, then select: method chaining gives a query-like pipeline without temporary variables.
