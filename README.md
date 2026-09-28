# LeetCode: complete-problem-set learning project

A long-term, **AI-assisted** project working through every LeetCode problem accessible to my account, in
JavaScript where the platform allows it. Each solved problem has a solution, local tests, and study notes. Progress is
tracked against LeetCode's live problem catalog, not a fixed number.

> **Transparency note.** The solutions, tests and notes in this repository are written by an AI coding assistant
> (Claude) and submitted to LeetCode on my account, as a structured learning exercise that I direct and review. They
> are **not** evidence that I independently solved these problems. The purpose is a well-documented study reference
> that I work through myself.

## Where things stand

The live numbers are in **[progress/STATUS.md](progress/STATUS.md)**, generated from recorded LeetCode results and
the latest catalog sync. Nothing in this README is updated by hand.

- **[progress/INDEX.md](progress/INDEX.md)**: every solved problem with difficulty, topics, LeetCode result, date
  and complexity.
- **[progress/tracker.json](progress/tracker.json)**: the same data, machine-readable (totals, per difficulty,
  per category, topic coverage, study-plan progress, account snapshot, badges).
- **[progress/badges.json](progress/badges.json)**: LeetCode badge and GitHub achievement tracker. Requirements
  are marked verified only when read from the site itself.

## Phase 1: September 2026 Daily Challenges (complete)

All 28 September 1–28, 2026 Daily Challenge problems were accepted on LeetCode. Only Sept 28 was solved inside its
daily window; the other 27 were solved afterwards and count as solved problems, not completed Daily Challenges.
- Study guide PDF: [docs/september-2026-study-guide.pdf](docs/september-2026-study-guide.pdf)
- Patterns across that set: [docs/patterns/README.md](docs/patterns/README.md)

## Phase 2: full problem set (in progress)

The order of work is in [docs/CURRICULUM.md](docs/CURRICULUM.md): the daily challenge first each day, then study
plans that award badges, then fundamentals by topic, then everything else until every accessible problem is covered.

Not every accessible problem can be solved in JavaScript. LeetCode offers only SQL/Pandas for database problems,
Bash for shell problems, and no JavaScript option for concurrency problems. Those are tracked separately by category
in STATUS.md.

## Repository layout

```
solutions/<id-range>/<NNNN-slug>/     e.g. solutions/0101-0200/0115-distinct-subsequences/
    solution.js                       solution with LeetCode's signature (exported for tests)
    solution.test.js                  node:test tests: examples, edge cases, brute-force comparison where useful
    NOTES.md                          summary in my own words, approach, why it works, edge cases, complexity, pattern
progress/
    catalog.json                      all problems listed on LeetCode (public metadata only)
    study-plans.json                  study plans, their badges and questions
    results.json                      every recorded LeetCode submission result (source of truth for "solved")
    daily-challenges.json             Daily Challenge history
    account-snapshot.json             numbers read from the logged-in profile
    badges.json                       badge / achievement tracker
    tracker.json, STATUS.md, INDEX.md generated
docs/                                 curriculum, patterns, study guides
scripts/                              sync-catalog, sync-study-plans, add-result, build-tracker, new-problem
tests/helpers/                        shared test utilities (LeetCode-style trees and linked lists)
```

Problem statements are **not** copied here. Notes summarize each problem in original wording and link to LeetCode.

## Commands

```bash
npm test          # run all solution tests (Node 18+, no dependencies)
npm run sync      # refresh the problem catalog and study plans from LeetCode
npm run tracker   # regenerate tracker.json, STATUS.md and INDEX.md
```

## Links

- LeetCode profile: https://leetcode.com/u/user7283A/

## License

MIT
