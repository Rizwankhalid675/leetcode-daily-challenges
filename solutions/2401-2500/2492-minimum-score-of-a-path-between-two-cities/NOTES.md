# 2492. Minimum Score of a Path Between Two Cities

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, union-find, graph |
| Link | https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/ |
| Context | Quest: DSA / Graph Theory Peaks / DFS |

## What it asks (own words)
The score of a walk from city 1 to city n is its smallest road. Walks may repeat roads and cities. Return the smallest score you can get.

## Approach
Run an iterative DFS from city 1 and take the minimum weight over every road touched in that component.

## Why it works
Cities 1 and n are guaranteed connected, so they share a component. For any road (a, b) in that component, you can walk 1 → a → b → a → … → n. Going back and forth is allowed, so that road joins the walk and pulls the score down to its weight. Roads in other components can never be used.

## Edge cases
- A cheaper road in a different component doesn't count.
- The answer is at least the global minimum weight in the component, never Infinity, because the path exists.

## Complexity
- Time: O(n + E)
- Space: O(n + E)

## Testing note
Compared with a fixed-point relaxation of "best score reachable at each city" that also lets you bounce back along a road. That oracle simulates walks rather than using the component argument.

## Reusable pattern
**Walks with repeats allowed → think in components, not paths.** Whatever a walk can touch is exactly the connected component.
