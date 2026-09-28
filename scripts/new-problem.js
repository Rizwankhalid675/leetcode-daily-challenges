// Scaffolds solutions/<id-range>/<NNNN-slug>/ with solution, test and notes templates.
// Usage: node scripts/new-problem.js <problemId> [<problemId> ...]
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const catalog = require('../progress/catalog.json');

const bucketOf = (id) => {
  const lo = Math.floor((Number(id) - 1) / 100) * 100 + 1;
  return `${String(lo).padStart(4, '0')}-${String(lo + 99).padStart(4, '0')}`;
};

for (const id of process.argv.slice(2)) {
  const p = catalog.problems.find((q) => q.id === id);
  if (!p) {
    console.error(`unknown problem ${id}`);
    continue;
  }
  const dir = path.join(root, 'solutions', bucketOf(id), `${id.padStart(4, '0')}-${p.slug}`);
  if (fs.existsSync(dir)) {
    console.log(`exists: ${path.relative(root, dir)}`);
    continue;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'NOTES.md'),
    `# ${id}. ${p.title}

| Field | Value |
|---|---|
| Difficulty | ${p.difficulty} |
| Topics | ${p.topics.join(', ')} |
| Link | https://leetcode.com/problems/${p.slug}/ |
| Result | (filled in from LeetCode after submission) |

## What it asks (own words)

## Key constraints

## Approach

## Why it works

## Edge cases

## Complexity
- Time:
- Space:

## Reusable pattern
`,
  );
  console.log(`created: ${path.relative(root, dir)}`);
}
