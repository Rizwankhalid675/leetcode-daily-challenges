# 460. LFU Cache

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, linked-list, design, doubly-linked-list |
| Link | https://leetcode.com/problems/lfu-cache/ |
| Context | Quest: System & Software Design / Cache System Design Base / Cache System Design |

## What it asks (own words)
A fixed-capacity cache that, when full, evicts the key used the fewest times; ties go to the key whose last use is oldest. Each get or put on a key counts as a use (an insert starts the count at 1). O(1) per operation.

## Approach
- `nodes`: key → [value, freq].
- `buckets`: freq → insertion-ordered Set of keys. Within a bucket, the first key is the least recently used one with that frequency.
- `minFreq`: the smallest frequency currently present.

Touching a key removes it from bucket f and appends it to bucket f+1. If bucket f becomes empty and f was the minimum, the minimum becomes f+1 (the key just moved there).

Inserting a new key into a full cache evicts the first key of `buckets[minFreq]`, then adds the new key to bucket 1 and resets `minFreq = 1`.

## Why minFreq is always correct
It only changes in two places: it goes up by one when its bucket empties because of a touch (and the touched key is now in f+1), and it drops to 1 on every insert. An eviction happens right before an insert, so a stale value after eviction is overwritten immediately.

## Edge cases
- Updating an existing key's value also counts as a use.
- Capacity 1: every new key evicts the only key, whatever its count.

## Complexity
- Time: O(1) average per operation
- Space: O(capacity)

## Testing note
Compared with a brute-force cache that scans all entries for (lowest count, oldest last use) on eviction, under random get/put sequences, plus a 2·10⁵-operation timing check.

## Reusable pattern
**Frequency buckets + min pointer**: group items by count in ordered sets; because counts move by +1 only, the minimum can be kept without a heap.
