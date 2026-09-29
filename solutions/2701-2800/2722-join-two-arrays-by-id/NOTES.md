# 2722. Join Two Arrays by ID

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/join-two-arrays-by-id/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Combine two arrays of objects keyed by `id`. An id present in only one array keeps its object. An id present in both gets a shallow merge where `arr2`'s properties override `arr1`'s. The result is sorted by id ascending.

## Key constraints
- Up to about 10^6 characters of JSON per array, and ids are unique integers within each array.

## Approach
A `Map` from id to object. Load `arr1`, then for each `arr2` object either insert it or replace the entry with `{ ...old, ...new }`. Finally sort the values by id with a numeric comparator. A `Map` plus an explicit sort is used instead of relying on plain-object integer-key ordering, which only works for non-negative array-index keys.

## Edge cases
- The merge is shallow: a nested object from `arr2` replaces the whole nested value (example 3).
- Inputs may be unsorted, and ids may be negative.

## Complexity
- Time: O((n + m) log(n + m)) for the sort
- Space: O(n + m)

## Testing note
The official examples, ordering with negative and large ids, and random inputs checked against a brute-force `find` + `Object.assign` merge.

## Reusable pattern
**Hash join on a key + shallow spread merge** (`{...a, ...b}`, where the right side wins).
