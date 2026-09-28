// Refreshes progress/study-plans.json from LeetCode's public study-plan pages.
// Records each plan's badge ("award"), whether it is premium-only, and its question ids.
// Note: some sub-groups are loaded client-side and can appear empty here ("partial": true).
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'progress', 'study-plans.json');
const PLANS = [
  'leetcode-75', 'top-interview-150', 'top-100-liked', 'programming-skills', 'dynamic-programming',
  '30-days-of-javascript', 'top-sql-50', 'introduction-to-pandas', 'binary-search', 'graph-theory',
  '30-days-of-pandas', 'dynamic-programming-grandmaster', 'premium-algo-100',
];

(async () => {
  const plans = [];
  for (const slug of PLANS) {
    const res = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: { 'content-type': 'application/json', referer: 'https://leetcode.com/studyplan/', 'user-agent': 'Mozilla/5.0' },
      body: JSON.stringify({
        query: `query($slug: String!) { studyPlanV2Detail(planSlug: $slug) {
          name premiumOnly award { name }
          planSubGroups { name questions { questionFrontendId titleSlug paidOnly } } } }`,
        variables: { slug },
      }),
    });
    const p = (await res.json()).data?.studyPlanV2Detail;
    if (!p) {
      console.warn(`no data for ${slug}`);
      continue;
    }
    const groups = (p.planSubGroups || []).map((g) => ({
      name: g.name,
      questions: (g.questions || []).map((q) => ({ id: q.questionFrontendId, slug: q.titleSlug, premium: q.paidOnly })),
    }));
    const questions = groups.flatMap((g) => g.questions);
    plans.push({
      slug,
      name: p.name,
      badge: p.award?.name ?? null,
      premiumPlan: p.premiumOnly,
      partial: groups.some((g) => g.questions.length === 0),
      questionCount: questions.length,
      premiumQuestions: questions.filter((q) => q.premium).map((q) => q.id),
      groups,
    });
    await new Promise((r) => setTimeout(r, 300));
  }
  fs.writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), plans }, null, 1) + '\n');
  for (const p of plans) console.log(`${p.slug}: ${p.questionCount} q, badge=${p.badge}, premiumPlan=${p.premiumPlan}, premiumQs=${p.premiumQuestions.length}, partial=${p.partial}`);
})();
