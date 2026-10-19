# Changelog

All notable changes to this portfolio hub are documented here.

## 2026-10-19 — v1.0.2

### Fixed

- **A number on the hub page did not survive a click-through.** The ecom-script-agent card claimed
  "4 大类违禁词校验 + **27 条自动替换**". In the repository, `27` is the **unit-test count**
  (`27 个单元测试覆盖`), not a count of replacement rules, and the README documents two rule layers
  (generic absolute-claim detection, medical-category checks) rather than four categories.
  The card now states what the repository actually contains: absolute-claim detection, medical
  mandatory checks, auto-rewrite of fixable phrasing, a library of 19 real viral scripts, and
  27 unit tests — with the "model writes, rules block" framing the README uses.
  This mattered because the same number is quoted on the resume; an interviewer opening the repo
  would have found a different meaning for it.

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
