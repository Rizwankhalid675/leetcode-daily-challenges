# 1032. Stream of Characters

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, string, design, trie, data-stream, aho-corasick-algorithm |
| Link | https://leetcode.com/problems/stream-of-characters/ |
| Context | Quest: System & Software Design / Data Flow Processing Center / Data Stream Processing |

## What it asks (own words)
Letters arrive one at a time. After each letter, report whether the text received so far ends with any word from a fixed list.

## Key constraints
- Up to 2000 words of length up to 200, and up to 4·10⁴ queries.

## Approach
A match must end at the newest letter, so read the stream **backwards**. Insert every word reversed into a trie. On each query, append the letter, then walk the trie from the newest letter towards older ones:
- no child for the current letter → no word can match, return false;
- reach a node marked as a word end → return true.

The walk never needs to go further back than the longest word, so the stored stream is only read up to `maxLen` letters deep.

The trie is flat typed arrays (`next[node * 26 + c]`), sized from the total word length, which keeps construction fast.

## Edge cases
- One word is a suffix of another (e.g. "f" and "ef"): the first word end we meet already answers true.
- Duplicate words are harmless.

## Complexity
- Time: O(total word length) to build, O(max word length) per query
- Space: O(26 · total word length) for the trie, plus the stream

## Testing note
Compared with `words.some(w => stream.endsWith(w))` on random words over a 3-letter alphabet, plus a worst-case timing check (long shared prefixes forcing 200-step walks).

## Reusable pattern
**Suffix queries on a stream → trie of reversed words**, walked from the newest character.
