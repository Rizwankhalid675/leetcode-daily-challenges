# 352. Data Stream as Disjoint Intervals

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, binary-search, union-find, design, data-stream, ordered-set |
| Link | https://leetcode.com/problems/data-stream-as-disjoint-intervals/ |
| Context | Quest: System & Software Design / Data Flow Processing Center / Data Stream Processing |

## What it asks (own words)
Non-negative integers stream in (repeats allowed). At any time, return the numbers seen so far compressed into sorted, disjoint runs of consecutive integers.

## Approach
Store the runs as a sorted array of `[start, end]` pairs where no two runs overlap or touch. For a new value, binary-search the last run starting at or before it (`i`) and the next run (`i + 1`):
1. already inside run i → nothing to do;
2. run i ends at value − 1 **and** run i+1 starts at value + 1 → merge the two runs into one;
3. only the left neighbour touches → extend its end;
4. only the right neighbour touches → extend its start;
5. otherwise → insert `[value, value]` at position i + 1.

`getIntervals` returns copies so callers can't corrupt the internal state.

## Follow-up (many merges, few intervals)
The array only ever holds the number of disjoint runs, so when merges are frequent it stays short and every operation is cheap. A balanced BST keyed by start would make inserts O(log k) even without that assumption.

## Edge cases
- Repeated values (case 1).
- A value that fills a one-number gap between two runs (case 2).

## Complexity
- Time: O(log k) search plus O(k) worst-case splice per add, O(k) per getIntervals (k = number of runs, at most about 5000 here)
- Space: O(k)

## Testing note
After every add, compared with rebuilding the runs from the sorted distinct values.

## Reusable pattern
**Sorted interval list with neighbour merging**: find the neighbour by binary search, then handle the four join cases.
