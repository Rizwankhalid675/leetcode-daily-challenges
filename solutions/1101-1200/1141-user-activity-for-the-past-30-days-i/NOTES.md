# 1141. User Activity for the Past 30 Days I

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/user-activity-for-the-past-30-days-i/ |
| Context | Quest: Database / Filtering & Aggregation Operation Cabin / Filtering & Aggregation |

## What it asks (own words)
For each day in the 30 days ending on 2019-07-27 (inclusive), how many different users did anything? Days with nobody active are simply omitted.

## Approach
Filter the date range, group by day, and count **distinct** users.

## Why it works
30 days ending on July 27 inclusive start on June 28 (June 28, 29, 30 plus July 1 to 27 is 3 + 27 = 30 days). `BETWEEN` is inclusive on both ends.

## Edge cases
- One user doing many activities on a day, and fully duplicated rows, count once because of `COUNT(DISTINCT user_id)`.
- 2019-06-27 and anything after 2019-07-27 must be excluded (off-by-one is the usual mistake here).

## Reusable pattern
**"N days ending on D inclusive" = `BETWEEN D - (N-1) days AND D`.** Work out the start date carefully.
