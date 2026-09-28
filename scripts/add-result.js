// Records a LeetCode submission result in progress/results.json.
// Usage: node scripts/add-result.js <problemId> <submissionId> <status> <tests> <runtime> <memory>
//          [--attempts N] [--daily YYYY-MM-DD] [--lang javascript]
// --daily is only for a problem accepted inside its own Daily Challenge window (verify on LeetCode first).
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'progress', 'results.json');
const catalog = require('../progress/catalog.json');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const [, value] = args.splice(i, 2);
  return value;
};
const attempts = Number(flag('attempts', '1'));
const dailyDate = flag('daily', null);
const language = flag('lang', 'javascript');
const [id, submission, status, tests, runtime, memory] = args;

const problem = catalog.problems.find((p) => p.id === id);
if (!problem || !submission || !status) {
  console.error('usage: add-result <problemId> <submissionId> <status> <tests> <runtime> <memory> [--attempts N] [--daily YYYY-MM-DD] [--lang L]');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const previous = data.results.find((r) => r.id === id);
data.results = data.results.filter((r) => r.id !== id);
data.results.push({
  ...previous,
  id,
  submission: Number(submission),
  status,
  tests,
  runtime,
  memory,
  language,
  attempts,
  solvedOn: previous?.solvedOn ?? new Date().toISOString().slice(0, 10),
  dailyDate: dailyDate ?? previous?.dailyDate ?? null,
});
data.results.sort((a, b) => Number(a.id) - Number(b.id));
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log(`recorded ${id} (${problem.title}): ${status}${dailyDate ? ` [daily ${dailyDate}]` : ''}`);
