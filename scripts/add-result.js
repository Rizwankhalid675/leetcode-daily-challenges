// Records a LeetCode submission result in progress/results.json.
// Usage: node scripts/add-result.js <problemId> <submissionId> <status> <tests> <runtime> <memory> [attempts]
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'progress', 'results.json');
const problems = require('../progress/problems.json');
const [id, submission, status, tests, runtime, memory, attempts = '1'] = process.argv.slice(2);
const problem = problems.find((p) => p.id === Number(id));
if (!problem || !submission || !status) {
  console.error('usage: add-result <problemId> <submissionId> <status> <tests> <runtime> <memory> [attempts]');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.results = data.results.filter((r) => r.id !== problem.id);
data.results.push({
  date: problem.date,
  id: problem.id,
  submission: Number(submission),
  status,
  tests,
  runtime,
  memory,
  attempts: Number(attempts),
  daily: problem.date === '2026-09-28', // only Sept 28 was solved inside its own daily window
});
data.results.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log(`recorded ${problem.id} ${status}`);
