# TikTok video API — examples

Per-video TikTok metrics — views, likes, comments, shares, saves.

**Live page, full schema & pricing → [quanticdata.io/collectors/tiktok-video-scraper-api/](https://quanticdata.io/collectors/tiktok-video-scraper-api/)**

Fetches public TikTok videos by URL or id and delivers description, creation time, author and author follower count, exact view/like/comment/share/save counts, duration, music and hashtags. Videos that are private, removed or region-locked come back under `failed` with TikTok's own reason — never billed as delivered. No login, no browser.

## Quick start (curl)

```bash
curl -X POST https://api.quanticdata.io/v1/scraper/collectors/tiktok_video/run \
  -H "Authorization: Bearer $QD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"videos": ["https://www.tiktok.com/@nasa/video/7668779420412284191"], "max_results": 5}'
```

## Python

See [`example.py`](example.py):

```bash
export QD_API_KEY=qd_live_...   # https://quanticdata.io/
python3 example.py
```

## Inputs

- `videos` (array, required) — Video URLs (https://www.tiktok.com/@user/video/123…) or numeric ids.
- `country` (string) — ISO 3166-1 alpha-2 code — proxy exit geo and Google locale (gl). Omit for the default pool.
- `max_results` (integer) — How many videos to deliver at most (1–50). You pay only for delivered videos.

## Output — one row per video

| field | type | description |
|---|---|---|
| `rank` | integer | 1-based delivery order. |
| `video_id` | string | TikTok video id. |
| `url` | string | Video URL. |
| `description` | string | Caption. |
| `created_at` | string | Publish time (ISO 8601). |
| `author` | string | Author handle. |
| `author_name` | string | Author display name. |
| `author_id` | string | Author id. |
| `author_verified` | boolean | Author verified badge. |
| `author_followers` | integer | Author follower count. |
| `views` | integer | Play count. |
| `likes` | integer | Like count. |
…and 8 more fields — full schema on the [live page](https://quanticdata.io/collectors/tiktok-video-scraper-api/).

## Pricing

**$0.004 per delivered video** ($4 per 1,000). A run that delivers nothing costs nothing, and failed rows are never billed. The $2/month free allowance covers roughly 500 videos — no card required.

## Links

- This collector: https://quanticdata.io/collectors/tiktok-video-scraper-api/
- All collectors: https://quanticdata.io/collectors/
- Docs: https://quanticdata.io/docs/
