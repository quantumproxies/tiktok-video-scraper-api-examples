// TikTok video scraper API: one typed row per video.
//
//   export QD_API_KEY=...        # https://app.quanticdata.io/register
//   node example.mjs https://www.tiktok.com/@nasa/video/7668779420412284191
//
// Node 18+, no dependencies.
// Docs and schema: https://quanticdata.io/collectors/tiktok-video-scraper-api/

const BASE = "https://api.quanticdata.io/v1";
const KEY = process.env.QD_API_KEY;
if (!KEY) {
  console.error("Set QD_API_KEY first: https://app.quanticdata.io/register");
  process.exit(1);
}
const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const videos = process.argv.slice(2);
if (!videos.length) videos.push("https://www.tiktok.com/@nasa/video/7668779420412284191");
const input = { videos, max_results: videos.length };

const res = await fetch(`${BASE}/scraper/collectors/tiktok_video/run`, {
  method: "POST",
  headers,
  body: JSON.stringify(input),
});
const body = await res.json();
if (!res.ok || body.type === "error") {
  console.error(`Request failed (${res.status}): ${body.message}`);
  process.exit(1);
}
let run = body.payload;

// Long runs answer 202 and finish in the background: poll the run until it is done.
while (run.status === "queued" || run.status === "running") {
  await new Promise((r) => setTimeout(r, 3000));
  const s = await fetch(`${BASE}/scraper/collectors/runs/${run.run_id}`, { headers });
  run = (await s.json()).payload;
}

const rows = run.results ?? [];
console.table(rows.map((v) => ({
  author: v.author,
  views: v.views,
  likes: v.likes,
  comments: v.comments,
  shares: v.shares,
  saves: v.saves,
  seconds: v.duration_seconds,
})));
console.log(`${rows.length} video rows`);
