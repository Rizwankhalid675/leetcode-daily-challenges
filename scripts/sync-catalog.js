// Refreshes progress/catalog.json from LeetCode's public problem list.
// Public metadata only (id, slug, title, difficulty, premium flag, topics, category); no statements.
// Per-account solved status is NOT available anonymously; it comes from progress/results.json.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'progress', 'catalog.json');
const CATEGORIES = ['algorithms', 'database', 'shell', 'concurrency', 'javascript', 'pandas'];
const PAGE = 100;

const QUERY = `query($cat: String, $limit: Int, $skip: Int) {
  questionList(categorySlug: $cat, limit: $limit, skip: $skip, filters: {}) {
    totalNum
    data { questionFrontendId titleSlug title difficulty isPaidOnly topicTags { slug } }
  }
}`;

async function gql(variables) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: { 'content-type': 'application/json', referer: 'https://leetcode.com/problemset/', 'user-agent': 'Mozilla/5.0' },
      body: JSON.stringify({ query: QUERY, variables }),
    });
    if (res.ok) return (await res.json()).data.questionList;
    if (attempt >= 5) throw new Error(`HTTP ${res.status}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
  }
}

async function fetchCategory(cat) {
  const first = await gql({ cat, limit: PAGE, skip: 0 });
  const rows = [...first.data];
  for (let skip = PAGE; skip < first.totalNum; skip += PAGE) {
    rows.push(...(await gql({ cat, limit: PAGE, skip })).data);
    await new Promise((r) => setTimeout(r, 300)); // be polite
  }
  return { total: first.totalNum, rows };
}

(async () => {
  const all = await gql({ cat: '', limit: 1, skip: 0 });
  const byId = new Map();
  for (const cat of CATEGORIES) {
    const { total, rows } = await fetchCategory(cat);
    console.log(`${cat}: ${total}`);
    for (const q of rows) {
      // Some problems are listed in more than one category (e.g. database + pandas).
      const existing = byId.get(q.questionFrontendId);
      if (existing) {
        existing.categories.push(cat);
        continue;
      }
      byId.set(q.questionFrontendId, {
        id: q.questionFrontendId,
        slug: q.titleSlug,
        title: q.title,
        difficulty: q.difficulty,
        premium: q.isPaidOnly,
        categories: [cat],
        topics: q.topicTags.map((t) => t.slug),
      });
    }
  }
  const problems = [...byId.values()].sort((a, b) => (isNaN(a.id) || isNaN(b.id) ? a.id.localeCompare(b.id) : a.id - b.id));
  const catalog = {
    fetchedAt: new Date().toISOString(),
    totalListed: all.totalNum,
    covered: problems.length,
    problems,
  };
  fs.writeFileSync(OUT, JSON.stringify(catalog, null, 0).replace(/\},\{/g, '},\n{') + '\n');
  console.log(`listed ${all.totalNum}, catalogued ${problems.length}`);
})();
