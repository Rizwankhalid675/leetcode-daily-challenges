# 2705. Compact Object

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/compact-object/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Given parsed JSON (an object or array), return a copy with every falsy value removed at every level. Arrays close up their gaps, and objects drop those keys.

## Approach
Recursion on the value type:
- primitive: return it (it's truthy, or the parent would have dropped it);
- array: push the compacted version of each truthy element;
- object: copy each key whose value is truthy, compacting the value.

Truthiness is tested **before** recursing. A container that becomes empty is still an object/array, which is truthy, so it stays (example 3 keeps `[0]` as `[]`).

## Edge cases
- Falsy values in JSON: `null`, `false`, `0`, `""`.
- The top-level value is always a container.

## Complexity
- Time: O(size of JSON)
- Space: O(size of JSON) for the copy, plus recursion depth

## Testing note
The official examples, emptied containers, and random nested JSON compared against an independently written `JSON.parse`-reviver oracle.

## Reusable pattern
**Structural recursion over JSON** (primitive / array / object).
