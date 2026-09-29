# 355. Design Twitter

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, linked-list, design, heap-priority-queue |
| Link | https://leetcode.com/problems/design-twitter/ |
| Context | Quest: System & Software Design / Business System Simulation Platform / Business System Simulation |

## What it asks (own words)
A tiny social network: users post tweets and follow/unfollow each other, and a user's feed is the 10 newest tweets among their own and those of everyone they follow, newest first.

## Approach
- A global counter stamps each tweet, so "newer" means a larger stamp.
- Per user: an array of `[time, id]` (appended, so oldest first) and a Set of followees.

For the feed, visit the user and each followee. Only a user's last 10 tweets can make the feed, so walk those from newest to oldest and insert each into a small sorted list of at most 10. Once the list is full and a tweet is older than the current 10th entry, the rest of that user's tweets are older still, so move on to the next user.

A k-way merge with a heap would also work, but with at most 10 results the bounded insertion is simpler and just as fast.

## Edge cases
- Unfollowing someone you don't follow, or following twice: the Set handles both.
- A user who follows themselves is skipped in the followee loop so their tweets aren't counted twice (the problem forbids it anyway).
- Users with no tweets or no follows.

## Complexity
- Time: O(1) for post/follow/unfollow; O(F · 10) worst case per feed, where F is the number of followees (≤ 500)
- Space: O(tweets + follow edges)

## Testing note
Compared with a brute-force global timeline (filter by visible authors, take the last 10, reverse) under random operation sequences, plus a timing check with 500 followees.

## Reusable pattern
**Top-k merge of sorted streams with early cut-off**: each source is sorted, so stop reading it as soon as it can't beat the current k-th best.
