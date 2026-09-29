# 175. Combine Two Tables

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/combine-two-tables/ |
| Context | Quest: Database / SQL Basic Query Workstation / SQL I |

## What it asks (own words)
List every person's name together with their city and state, leaving the location blank (NULL) when we have no address for them.

## Approach
`Person` is the table that must be fully preserved, so it goes on the left of a `LEFT JOIN` against `Address` on `personId`.

## Edge cases
- Person with no address: the join finds nothing, so `city`/`state` come back NULL, which is exactly what's wanted.
- Address rows whose `personId` isn't in `Person` (like personId 3 in the example) are dropped, since only the left side is preserved.

## Reusable pattern
**"Report X for every row of A, NULL if missing" means `A LEFT JOIN B`.** An inner join would silently drop the people with no match.
