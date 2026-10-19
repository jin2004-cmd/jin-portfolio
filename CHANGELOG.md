# Changelog

All notable changes to this portfolio hub are documented here.

## 2026-10-19 — v1.0.1

### Added

- `README.md` — what the hub contains, how to use it offline, the privacy note, and the
  two-layer LLM output quality gate shared by TalkCal / DayPilot / ecom-script-agent.
- `LICENSE` (MIT) — the repository previously shipped no license at all.
- `CHANGELOG.md` (this file).

### Fixed

- **`og:image` was a malformed concatenation.** The meta tag read
  `https://jin2004-cmd.github.io/ai-video-portfolio/data:image/jpeg;base64,/9j/4AAQ…` —
  a URL glued onto a base64 payload, which is not a resolvable address. Any share of the
  link in WeChat / Feishu / DingTalk rendered a broken preview thumbnail.
  It now points at a real asset: `https://jin2004-cmd.github.io/ai-video-portfolio/assets/dragon-v3.jpg`.
  Removing the inlined base64 also shrank `ai-video-portfolio.html` from 2,187,330 to 1,974,635 bytes.

### Not changed

- No new works were added. No work page was rewritten. This release is documentation and
  one bug fix only.

## 2026-10-18 — v1.0.0 (first baseline)

### Added

- The hub itself: `index.html` as a single entry, six self-contained work pages
  (`ai-video-portfolio`, `hou-storyboard`, `daypilot`, `ecom-script-agent`, `offeragent`,
  `ad-compliance`), the full TalkCal application, and seven `shots/*.jpg` thumbnails.

### Enabled

- GitHub Pages served from `main` `/` on 2026-10-19. Before that the site returned 404 because
  Pages had never been switched on; the files were already present.

### Known gaps

- Video assets are hosted off-repo to keep the bundle small, so the video pages need a network
  connection to play; offline they show poster frames and captions only.
- The `*.workers.dev` mirrors linked as "在线版（免翻墙）" could not be verified from the author's
  work network — its DNS resolves `*.workers.dev` to Meta-owned IP space, which indicates
  local DNS interception rather than a broken site. Status from a normal network: unconfirmed.
